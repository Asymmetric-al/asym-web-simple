import { EARLY_ACCESS_RATE_LIMIT_WINDOW_SECONDS } from "@/lib/early-access";

const RATE_LIMIT_WINDOW_MS = EARLY_ACCESS_RATE_LIMIT_WINDOW_SECONDS * 1000;
const DEFAULT_RATE_LIMIT_MAX_REQUESTS = 8;
const DEFAULT_MAX_TRACKED_KEYS = 2000;

export interface RateLimitBucket {
  count: number;
  resetAt: number;
}

export type RateLimitDecision =
  | { readonly limited: false }
  | { readonly limited: true; readonly retryAfterSeconds: number };

const normalizeHost = (raw: string | null | undefined): string | null => {
  if (!raw) {
    return null;
  }
  const first = raw.split(",", 1)[0]?.trim().toLowerCase() ?? "";
  return first.length > 0 ? first : null;
};

const parseHostFromUrl = (rawUrl: string): string | null => {
  try {
    const parsed = new URL(rawUrl);
    return parsed.host.toLowerCase();
  } catch {
    return null;
  }
};

const readExpectedHost = (request: Request): string | null => {
  const forwardedHost = normalizeHost(request.headers.get("x-forwarded-host"));
  if (forwardedHost) {
    return forwardedHost;
  }
  const hostHeader = normalizeHost(request.headers.get("host"));
  return hostHeader ?? parseHostFromUrl(request.url);
};

/**
Rejects cross-site POST requests using Fetch Metadata (`Sec-Fetch-Site`) and
`Origin` host verification, blocking cross-origin `application/x-www-form-urlencoded`
and JSON spam posts while permitting same-origin browsers and direct server/CLI callers.
*/
export const isSameOriginRequest = (request: Request): boolean => {
  const secFetchSite = request.headers
    .get("sec-fetch-site")
    ?.trim()
    .toLowerCase();
  if (secFetchSite === "cross-site") {
    return false;
  }

  const originHeader = request.headers.get("origin")?.trim();
  if (!originHeader) {
    return true;
  }
  if (originHeader.toLowerCase() === "null") {
    return false;
  }

  const originHost = parseHostFromUrl(originHeader);
  if (!originHost) {
    return false;
  }

  const expectedHost = readExpectedHost(request);
  return expectedHost !== null && originHost === expectedHost;
};

/**
Bounded fixed-window rate limiter factory (per serverless isolate; swap for a
shared store such as Redis/KV before scaling high-volume production intake).
*/
export const createEarlyAccessRateLimiter = ({
  maxRequests = DEFAULT_RATE_LIMIT_MAX_REQUESTS,
  windowMs = RATE_LIMIT_WINDOW_MS,
  maxTrackedKeys = DEFAULT_MAX_TRACKED_KEYS,
}: {
  readonly maxRequests?: number;
  readonly windowMs?: number;
  readonly maxTrackedKeys?: number;
} = {}) => {
  const store = new Map<string, RateLimitBucket>();

  return {
    check: (clientIp: string, now: number): RateLimitDecision => {
      const current = store.get(clientIp);
      if (current && current.resetAt > now) {
        current.count += 1;
        if (current.count > maxRequests) {
          const retryAfterSeconds = Math.max(
            1,
            Math.ceil((current.resetAt - now) / 1000)
          );
          return { limited: true, retryAfterSeconds };
        }
        return { limited: false };
      }

      // Drop expired buckets, then the oldest live entries, so store.size never exceeds maxTrackedKeys.
      store.delete(clientIp);
      for (const [key, entry] of store) {
        if (entry.resetAt > now && store.size < maxTrackedKeys) {
          break;
        }
        store.delete(key);
      }
      store.set(clientIp, {
        count: 1,
        resetAt: now + windowMs,
      });
      return { limited: false };
    },
    size: (): number => store.size,
  };
};

/**
Verifies that a `/early-access/status?state=received` view is backed by the
short-lived `HttpOnly` confirmation cookie issued on an accepted `POST`.
*/
export const isEarlyAccessConfirmationValid = (
  state: string | undefined,
  cookieValue: string | undefined
): boolean => state === "received" && cookieValue === "1";

export { EARLY_ACCESS_CONFIRMED_COOKIE } from "@/lib/early-access";

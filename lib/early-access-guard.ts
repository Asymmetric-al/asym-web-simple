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

const normalizeProto = (raw: string | null | undefined): string | null => {
  if (!raw) {
    return null;
  }
  const first = raw.split(",", 1)[0]?.trim().toLowerCase() ?? "";
  return first === "http" || first === "https" ? `${first}:` : null;
};

const formatOrigin = (parsed: URL): string | null =>
  parsed.protocol === "http:" || parsed.protocol === "https:"
    ? `${parsed.protocol}//${parsed.host.toLowerCase()}`
    : null;

const parseOriginFromUrl = (rawUrl: string): string | null => {
  try {
    return formatOrigin(new URL(rawUrl));
  } catch {
    return null;
  }
};

const readExpectedOrigin = (request: Request): string | null => {
  const forwardedHost = normalizeHost(request.headers.get("x-forwarded-host"));
  const host = forwardedHost ?? normalizeHost(request.headers.get("host"));
  const requestOrigin = parseOriginFromUrl(request.url);
  if (!host) {
    return requestOrigin;
  }
  const forwardedProto = normalizeProto(request.headers.get("x-forwarded-proto"));
  let protocol: string | null = forwardedProto;
  if (!protocol && forwardedHost) {
    protocol = "https:";
  } else if (!protocol && requestOrigin) {
    protocol = requestOrigin.startsWith("https:") ? "https:" : "http:";
  }
  return protocol ? `${protocol}//${host}` : null;
};

/**
Rejects cross-site POST requests using Fetch Metadata (`Sec-Fetch-Site`) and
full `Origin` (scheme + host) verification, blocking cross-origin and
scheme-downgrade posts while permitting same-origin browsers and direct callers.
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

  const incomingOrigin = parseOriginFromUrl(originHeader);
  if (!incomingOrigin) {
    return false;
  }

  const expectedOrigin = readExpectedOrigin(request);
  return expectedOrigin !== null && incomingOrigin === expectedOrigin;
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

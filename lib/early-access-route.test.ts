import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/early-access/route";

const resendSendMock = vi.hoisted(() =>
  vi.fn<
    () => Promise<{ data: { id: string } | null; error: { message: string } | null }>
  >()
);

vi.mock(import("resend"), () => ({
  Resend: class MockResend {
    emails = {
      send: resendSendMock,
    };
  } as unknown as typeof import("resend").Resend,
}));

const EMAIL_ENV_KEYS = [
  "RESEND_API_KEY",
  "CONTACT_INBOX_EMAIL",
  "CONTACT_FROM_EMAIL",
  "NEXT_PUBLIC_CONTACT_EMAIL",
] as const;

const ROUTE_URL = "https://asym.app/api/early-access";
const SAME_ORIGIN = "https://asym.app";
const RATE_LIMIT_BURST_COUNT = 8;

const makeRequest = (
  headers: Record<string, string>,
  body: BodyInit | null = null
): Request =>
  new Request(ROUTE_URL, {
    body,
    headers,
    method: "POST",
  });

const setConfiguredEmailEnv = () => {
  process.env.RESEND_API_KEY = "re_test_key_placeholder";
  process.env.CONTACT_INBOX_EMAIL = "hello@example.org";
  process.env.CONTACT_FROM_EMAIL = "asym <hello@example.org>";
  process.env.NEXT_PUBLIC_CONTACT_EMAIL = "hello@example.org";
};

const clearEmailEnv = () => {
  for (const key of EMAIL_ENV_KEYS) {
    Reflect.deleteProperty(process.env, key);
  }
};

describe("POST /api/early-access route handler", () => {
  const savedEnv = new Map<string, string | undefined>();

  beforeEach(() => {
    resendSendMock.mockReset();
    resendSendMock.mockResolvedValue({ data: { id: "msg_123" }, error: null });
    for (const key of EMAIL_ENV_KEYS) {
      savedEnv.set(key, process.env[key]);
    }
    clearEmailEnv();
  });

  afterEach(() => {
    for (const key of EMAIL_ENV_KEYS) {
      const value = savedEnv.get(key);
      if (value === undefined) {
        Reflect.deleteProperty(process.env, key);
      } else {
        process.env[key] = value;
      }
    }
  });

  it("rejects unsupported media types with 415", async () => {
    const response = await POST(
      makeRequest(
        {
          "content-type": "text/plain",
          origin: SAME_ORIGIN,
        },
        "hello"
      )
    );
    expect(response.status).toBe(415);
  });

  it("rejects cross-origin requests with 403", async () => {
    const response = await POST(
      makeRequest(
        {
          "content-type": "application/json",
          origin: "https://evil.example",
          "sec-fetch-site": "cross-site",
        },
        JSON.stringify({
          email: "director@example.org",
          organization: "Example Missions",
        })
      )
    );
    expect(response.status).toBe(403);
  });

  it("returns 503 for JSON and 303 unavailable for native forms when unconfigured", async () => {
    const jsonRes = await POST(
      makeRequest(
        {
          "content-type": "application/json",
          origin: SAME_ORIGIN,
        },
        JSON.stringify({
          email: "director@example.org",
          organization: "Example Missions",
        })
      )
    );
    expect(jsonRes.status).toBe(503);

    const formRes = await POST(
      makeRequest(
        {
          "content-type": "application/x-www-form-urlencoded",
          origin: SAME_ORIGIN,
        },
        "email=director%40example.org&organization=Example+Missions"
      )
    );
    expect(formRes.status).toBe(303);
    expect(formRes.headers.get("location")).toBe(
      "/early-access/status?state=unavailable"
    );
  });

  it("rejects malformed JSON with 400 when configured", async () => {
    setConfiguredEmailEnv();
    const response = await POST(
      makeRequest(
        {
          "content-type": "application/json",
          origin: SAME_ORIGIN,
          "x-real-ip": "198.51.100.10",
        },
        "{not-json"
      )
    );
    expect(response.status).toBe(400);
  });

  it("enforces the byte ceiling on streamed bodies without content-length (413)", async () => {
    setConfiguredEmailEnv();
    const encoder = new TextEncoder();
    const oversizedChunk = encoder.encode("a".repeat(20_000));
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(oversizedChunk);
        controller.close();
      },
    });
    const request = new Request(ROUTE_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: SAME_ORIGIN,
        "x-real-ip": "198.51.100.11",
      },
      body: stream,
      duplex: "half",
    } as RequestInit);

    const response = await POST(request);
    expect(response.status).toBe(413);
  });

  it("returns 422 JSON and 303 invalid redirect for invalid fields", async () => {
    setConfiguredEmailEnv();
    const jsonRes = await POST(
      makeRequest(
        {
          "content-type": "application/json",
          origin: SAME_ORIGIN,
          "x-real-ip": "198.51.100.12",
        },
        JSON.stringify({ email: "not-an-email", organization: "" })
      )
    );
    expect(jsonRes.status).toBe(422);

    const formRes = await POST(
      makeRequest(
        {
          "content-type": "application/x-www-form-urlencoded",
          origin: SAME_ORIGIN,
          "x-real-ip": "198.51.100.13",
        },
        "email=not-an-email&organization="
      )
    );
    expect(formRes.status).toBe(303);
    expect(formRes.headers.get("location")).toBe(
      "/early-access/status?state=invalid"
    );
  });

  it("silently drops honeypot submissions without external email delivery", async () => {
    setConfiguredEmailEnv();
    const jsonRes = await POST(
      makeRequest(
        {
          "content-type": "application/json",
          origin: SAME_ORIGIN,
          "x-real-ip": "198.51.100.14",
        },
        JSON.stringify({
          email: "bot@example.org",
          organization: "Bot Corp",
          website: "https://spam.example",
        })
      )
    );
    expect(jsonRes.status).toBe(200);
    await expect(jsonRes.json()).resolves.toStrictEqual({ ok: true });
    expect(resendSendMock).not.toHaveBeenCalled();

    const formRes = await POST(
      makeRequest(
        {
          "content-type": "application/x-www-form-urlencoded",
          origin: SAME_ORIGIN,
          "x-real-ip": "198.51.100.15",
        },
        "email=bot%40example.org&organization=Bot&website=https%3A%2F%2Fspam.example"
      )
    );
    expect(formRes.status).toBe(303);
    expect(formRes.headers.get("location")).toBe(
      "/early-access/status?state=received"
    );
    expect(resendSendMock).not.toHaveBeenCalled();
  });

  it("returns 200 JSON and 303 with HttpOnly confirmation cookie only after Resend accepts delivery", async () => {
    setConfiguredEmailEnv();
    const jsonRes = await POST(
      makeRequest(
        {
          "content-type": "application/json",
          origin: SAME_ORIGIN,
          "x-real-ip": "198.51.100.20",
        },
        JSON.stringify({
          email: "director@example.org",
          organization: "Example Missions",
          message: "Donor portals",
        })
      )
    );
    expect(jsonRes.status).toBe(200);
    await expect(jsonRes.json()).resolves.toStrictEqual({ ok: true });
    expect(resendSendMock).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        from: "asym <hello@example.org>",
        replyTo: "director@example.org",
        to: ["hello@example.org"],
      })
    );

    const formRes = await POST(
      makeRequest(
        {
          "content-type": "application/x-www-form-urlencoded",
          origin: SAME_ORIGIN,
          "x-forwarded-proto": "https",
          "x-real-ip": "198.51.100.21",
        },
        "email=director%40example.org&organization=Example+Missions"
      )
    );
    expect(formRes.status).toBe(303);
    expect(formRes.headers.get("location")).toBe(
      "/early-access/status?state=received"
    );
    const setCookie = formRes.headers.get("set-cookie") ?? "";
    expect(setCookie).toContain("asym_ea_confirmed=1");
    expect(setCookie.toLowerCase()).toContain("httponly");
    expect(setCookie.toLowerCase()).toContain("samesite=lax");
    expect(setCookie.toLowerCase()).toContain("secure");
  });

  it("returns 502 JSON and 303 failed without confirmation cookie when Resend rejects or throws", async () => {
    setConfiguredEmailEnv();
    resendSendMock.mockResolvedValueOnce({
      data: null,
      error: { message: "provider_rejected" },
    });
    const jsonRes = await POST(
      makeRequest(
        {
          "content-type": "application/json",
          origin: SAME_ORIGIN,
          "x-real-ip": "198.51.100.22",
        },
        JSON.stringify({
          email: "director@example.org",
          organization: "Example Missions",
        })
      )
    );
    expect(jsonRes.status).toBe(502);

    resendSendMock.mockRejectedValueOnce(new Error("timeout"));
    const formRes = await POST(
      makeRequest(
        {
          "content-type": "application/x-www-form-urlencoded",
          origin: SAME_ORIGIN,
          "x-real-ip": "198.51.100.23",
        },
        "email=director%40example.org&organization=Example+Missions"
      )
    );
    expect(formRes.status).toBe(303);
    expect(formRes.headers.get("location")).toBe(
      "/early-access/status?state=failed"
    );
    expect(formRes.headers.get("set-cookie")).toBeNull();
  });

  it("enforces burst rate limiting with 429 Retry-After and 303 rate_limited redirects", async () => {
    setConfiguredEmailEnv();
    const ip = "198.51.100.99";
    for (let attempt = 0; attempt < RATE_LIMIT_BURST_COUNT; attempt += 1) {
      const okRes = await POST(
        makeRequest(
          {
            "content-type": "application/json",
            origin: SAME_ORIGIN,
            "x-real-ip": ip,
          },
          JSON.stringify({
            email: "director@example.org",
            organization: "Example Missions",
          })
        )
      );
      expect(okRes.status).toBe(200);
    }

    const limitedJson = await POST(
      makeRequest(
        {
          "content-type": "application/json",
          origin: SAME_ORIGIN,
          "x-real-ip": ip,
        },
        JSON.stringify({
          email: "director@example.org",
          organization: "Example Missions",
        })
      )
    );
    expect(limitedJson.status).toBe(429);
    expect(Number(limitedJson.headers.get("retry-after"))).toBeGreaterThan(0);

    const limitedForm = await POST(
      makeRequest(
        {
          "content-type": "application/x-www-form-urlencoded",
          origin: SAME_ORIGIN,
          "x-real-ip": ip,
        },
        "email=director%40example.org&organization=Example+Missions"
      )
    );
    expect(limitedForm.status).toBe(303);
    expect(limitedForm.headers.get("location")).toContain(
      "/early-access/status?state=rate_limited&retry="
    );
  });
});

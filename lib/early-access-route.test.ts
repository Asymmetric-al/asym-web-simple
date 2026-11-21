import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { POST } from "@/app/api/early-access/route";

const EMAIL_ENV_KEYS = [
  "RESEND_API_KEY",
  "CONTACT_INBOX_EMAIL",
  "CONTACT_FROM_EMAIL",
  "NEXT_PUBLIC_CONTACT_EMAIL",
] as const;

const ROUTE_URL = "https://asym.app/api/early-access";
const SAME_ORIGIN = "https://asym.app";

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
  });
});

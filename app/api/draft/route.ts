import { timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isSafeEqual = (a: string, b: string): boolean => {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length ? timingSafeEqual(ab, bb) : false;
};

const parseOriginUrl = (rawSlug: string, origin: string): URL | null => {
  try {
    return new URL(rawSlug, origin);
  } catch {
    return null;
  }
};

const resolveSameOriginTarget = (rawSlug: string, origin: string): URL => {
  const fallback = new URL("/", origin);
  if (
    !rawSlug.startsWith("/") ||
    rawSlug.startsWith("//") ||
    rawSlug.includes("\\")
  ) {
    return fallback;
  }

  const candidate = parseOriginUrl(rawSlug, origin);
  return candidate && candidate.origin === origin ? candidate : fallback;
};

// eslint-disable-next-line sonarjs/function-name -- Next.js route handlers must be named after the HTTP method.
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const expectedSecret = process.env.PAYLOAD_DRAFT_SECRET?.trim();
  if (!expectedSecret) {
    return NextResponse.json(
      { error: "Draft mode is not configured." },
      { status: 503 }
    );
  }

  const { searchParams } = request.nextUrl;
  const secret = searchParams.get("secret") ?? "";

  if (!isSafeEqual(secret, expectedSecret)) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const rawSlug = searchParams.get("slug") ?? "/";
  const target = resolveSameOriginTarget(rawSlug, request.nextUrl.origin);

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(target);
};

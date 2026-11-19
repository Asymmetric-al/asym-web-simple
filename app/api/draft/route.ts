import { timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const safeEqual = (a: string, b: string): boolean => {
  try {
    const ab = Buffer.from(a);
    const bb = Buffer.from(b);
    return ab.length === bb.length ? timingSafeEqual(ab, bb) : false;
  } catch {
    return false;
  }
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
  const rawSlug = searchParams.get("slug") ?? "/";

  if (!safeEqual(secret, expectedSecret)) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  // Guard against open-redirect: only allow relative paths
  const slug =
    rawSlug.startsWith("/") && !rawSlug.startsWith("//") ? rawSlug : "/";

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(slug, request.nextUrl.origin));
};

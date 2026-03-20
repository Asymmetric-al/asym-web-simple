import { timingSafeEqual } from "crypto";
import { draftMode } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function safeEqual(a: string, b: string): boolean {
  try {
    const ab = Buffer.from(a);
    const bb = Buffer.from(b);
    if (ab.length !== bb.length) return false;
    return timingSafeEqual(ab, bb);
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get("secret") ?? "";
  const rawSlug = searchParams.get("slug") ?? "/";

  if (!safeEqual(secret, process.env.PAYLOAD_DRAFT_SECRET ?? "")) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  // Guard against open-redirect: only allow relative paths
  const slug = rawSlug.startsWith("/") && !rawSlug.startsWith("//") ? rawSlug : "/";

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(slug, request.nextUrl.origin));
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isPayloadConfigured = (): boolean =>
  Boolean(process.env.DATABASE_URI?.trim() && process.env.PAYLOAD_SECRET?.trim());

export const proxy = (request: NextRequest): NextResponse => {
  if (!isPayloadConfigured()) {
    return NextResponse.rewrite(
      new URL("/_unconfigured-not-found", request.url)
    );
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

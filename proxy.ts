import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isPayloadConfigured = (): boolean =>
  Boolean(process.env.DATABASE_URI?.trim() && process.env.PAYLOAD_SECRET?.trim());

export const proxy = (request: NextRequest): NextResponse => {
  const { pathname } = request.nextUrl;
  const isQaRoute = pathname === "/qa" || pathname.startsWith("/qa/");
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const shouldHideRoute =
    (isQaRoute && process.env.NODE_ENV === "production") ||
    (isAdminRoute && !isPayloadConfigured());

  return shouldHideRoute
    ? NextResponse.rewrite(new URL("/_unconfigured-not-found", request.url))
    : NextResponse.next();
};

export const config = {
  matcher: ["/admin", "/admin/:path*", "/qa", "/qa/:path*"],
};

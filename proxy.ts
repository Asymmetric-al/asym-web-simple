import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isPayloadConfigured = (): boolean =>
  Boolean(process.env.DATABASE_URI?.trim() && process.env.PAYLOAD_SECRET?.trim());

const buildNonceCsp = (nonce: string): string => {
  const devEval = process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${devEval}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
};

export const proxy = (request: NextRequest): NextResponse => {
  const { pathname } = request.nextUrl;
  const isQaRoute = pathname === "/qa" || pathname.startsWith("/qa/");
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const shouldHideRoute =
    (isQaRoute && process.env.NODE_ENV === "production") ||
    (isAdminRoute && !isPayloadConfigured());

  if (isAdminRoute && !shouldHideRoute) {
    return NextResponse.next();
  }

  // 128-bit CSPRNG hex nonce (valid CSP base64-value charset across Node & Edge runtimes).
  const nonce = crypto.randomUUID().replaceAll("-", "");
  const csp = buildNonceCsp(nonce);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = shouldHideRoute
    ? NextResponse.rewrite(new URL("/_unconfigured-not-found", request.url), {
        request: { headers: requestHeaders },
      })
    : NextResponse.next({
        request: { headers: requestHeaders },
      });

  response.headers.set("Content-Security-Policy", csp);
  return response;
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|art|brand|favicon\\.ico|icon\\.png|apple-icon\\.png|robots\\.txt|sitemap\\.xml|site\\.webmanifest|llms\\.txt|opengraph-image).*)",
  ],
};

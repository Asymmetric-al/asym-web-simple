export function GET(request: Request): Response {
  return Response.redirect(new URL("/contributor", request.url), 308);
}

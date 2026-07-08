import { readFileSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-static";
export const runtime = "nodejs";

const deckHtml = readFileSync(
  join(process.cwd(), "public", "deck", "index.html"),
  "utf8"
);

export function GET(): Response {
  return new Response(deckHtml, {
    headers: {
      "cache-control": "public, max-age=0, s-maxage=86400",
      "content-type": "text/html; charset=utf-8",
      "x-content-type-options": "nosniff",
    },
  });
}

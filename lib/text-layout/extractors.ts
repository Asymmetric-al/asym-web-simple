import type { PlainTextExcerptOptions } from "./types";

const COLLAPSIBLE_WHITESPACE = /\s+/g;

export function extractPlainTextExcerpt(
  value: string,
  options: PlainTextExcerptOptions = {}
): string {
  const excerpt = value.replace(COLLAPSIBLE_WHITESPACE, " ").trim();

  if (
    options.maxLength === undefined ||
    options.maxLength <= 0 ||
    excerpt.length <= options.maxLength
  ) {
    return excerpt;
  }

  return `${excerpt.slice(0, options.maxLength).trimEnd()}...`;
}

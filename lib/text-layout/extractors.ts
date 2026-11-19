import type { PlainTextExcerptOptions } from "./types";

const COLLAPSIBLE_WHITESPACE = /\s+/g;

export function extractPlainTextExcerpt(
  value: string,
  options: PlainTextExcerptOptions = {}
): string {
  const excerpt = value.replaceAll(COLLAPSIBLE_WHITESPACE, " ").trim();

  return options.maxLength === undefined ||
    options.maxLength <= 0 ||
    excerpt.length <= options.maxLength
    ? excerpt
    : `${excerpt.slice(0, options.maxLength).trimEnd()}...`;
}

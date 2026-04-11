import { prepare, type PrepareOptions, type PreparedText } from "@chenglou/pretext";

const preparedTextCache = new Map<string, PreparedText>();

function buildPreparedTextCacheKey(
  text: string,
  font: string,
  options?: PrepareOptions
): string {
  return JSON.stringify([text, font, options ?? null]);
}

export function getPreparedText(
  text: string,
  font: string,
  options?: PrepareOptions
): PreparedText {
  const cacheKey = buildPreparedTextCacheKey(text, font, options);
  const cached = preparedTextCache.get(cacheKey);

  if (cached !== undefined) {
    return cached;
  }

  const prepared = prepare(text, font, options);
  preparedTextCache.set(cacheKey, prepared);
  return prepared;
}

export function clearPreparedTextCache(): void {
  preparedTextCache.clear();
}

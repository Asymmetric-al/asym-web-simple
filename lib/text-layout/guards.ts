export function canUseTextLayout(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof Intl !== "undefined" &&
    Intl.Segmenter !== undefined &&
    (typeof OffscreenCanvas !== "undefined" || typeof document !== "undefined")
  );
}

export async function waitForTextLayoutFontsReady(): Promise<void> {
  if (typeof document === "undefined" || document.fonts === undefined) {
    return;
  }

  await document.fonts.ready;
}

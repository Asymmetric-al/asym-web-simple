import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

interface Rgb {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;
}

const HEX_RADIX = 16;
const MAX_CHANNEL = 255;
const SRGB_THRESHOLD = 4045 / 100_000;
const SRGB_DIVISOR = 12.92;
const SRGB_OFFSET = 0.055;
const SRGB_SCALE = 1.055;
const SRGB_EXPONENT = 2.4;
const LUM_R = 0.2126;
const LUM_G = 0.7152;
const LUM_B = 0.0722;
const CONTRAST_OFFSET = 0.05;
const AA_TEXT_MIN = 4.5;
const AA_NON_TEXT_MIN = 3;
const HEX_LENGTH = 7;

const parseColor = (raw: string): Rgb => {
  const value = raw.trim();
  if (value.startsWith("#") && value.length === HEX_LENGTH) {
    return {
      r: Number.parseInt(value.slice(1, 3), HEX_RADIX),
      g: Number.parseInt(value.slice(3, 5), HEX_RADIX),
      b: Number.parseInt(value.slice(5, 7), HEX_RADIX),
      a: 1,
    };
  }

  if (value.startsWith("rgb(") && value.endsWith(")")) {
    const inner = value.slice(4, -1).trim();
    const [channelsRaw = "", alphaRaw = "100%"] = inner.split("/", 2);
    const [rRaw = "0", gRaw = "0", bRaw = "0"] = channelsRaw
      .trim()
      .split(/\s+/u, 3);
    const alphaPercent = Number(alphaRaw.replace("%", "").trim());
    return {
      r: Number(rRaw),
      g: Number(gRaw),
      b: Number(bRaw),
      a: alphaPercent / 100,
    };
  }

  throw new Error(`Unsupported color token format: ${raw}`);
};

const composite = (fg: Rgb, bg: Rgb): Rgb => ({
  r: fg.r * fg.a + bg.r * (1 - fg.a),
  g: fg.g * fg.a + bg.g * (1 - fg.a),
  b: fg.b * fg.a + bg.b * (1 - fg.a),
  a: 1,
});

const linearize = (channel: number): number => {
  const normalized = channel / MAX_CHANNEL;
  return normalized <= SRGB_THRESHOLD
    ? normalized / SRGB_DIVISOR
    : ((normalized + SRGB_OFFSET) / SRGB_SCALE) ** SRGB_EXPONENT;
};

const luminance = (color: Rgb): number =>
  LUM_R * linearize(color.r) +
  LUM_G * linearize(color.g) +
  LUM_B * linearize(color.b);

const contrastRatio = (fgRaw: string, bgRaw: string): number => {
  const bg = parseColor(bgRaw);
  const fg = composite(parseColor(fgRaw), bg);
  const lum1 = luminance(fg);
  const lum2 = luminance(bg);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + CONTRAST_OFFSET) / (darker + CONTRAST_OFFSET);
};

const extractBlockTokens = (
  css: string,
  selector: string
): Map<string, string> => {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) {
    throw new Error(`Missing CSS block: ${selector}`);
  }
  const end = css.indexOf("\n}", start);
  const block = css.slice(start, end);
  const tokens = new Map<string, string>();
  for (const line of block.split("\n")) {
    const trimmed = line.trim();
    const colon = trimmed.indexOf(":");
    if (colon === -1 || !trimmed.startsWith("--") || !trimmed.endsWith(";")) {
      continue;
    }
    const name = trimmed.slice(0, colon).trim();
    const val = trimmed.slice(colon + 1, -1).trim();
    tokens.set(name, val);
  }
  return tokens;
};

const requireToken = (tokens: Map<string, string>, name: string): string => {
  const value = tokens.get(name);
  if (value === undefined) {
    throw new Error(`Missing token ${name}`);
  }
  return value;
};

describe("design token WCAG 2.2 AA contrast", () => {
  const globalsCss = readFileSync(
    path.join(process.cwd(), "app", "globals.css"),
    "utf-8"
  );
  const light = extractBlockTokens(globalsCss, ":root");
  const dark = extractBlockTokens(globalsCss, ".dark");

  it("keeps all primary light and dark text tokens >= 4.5:1", () => {
    const textPairs: readonly [string, string][] = [
      ["--foreground", "--background"],
      ["--muted-foreground", "--background"],
      ["--muted-foreground", "--card"],
      ["--pine", "--background"],
      ["--pine", "--card"],
      ["--pine", "--pine-soft"],
      ["--vermilion", "--background"],
      ["--vermilion", "--card"],
      ["--vermilion", "--vermilion-soft"],
      ["--draft", "--background"],
      ["--draft", "--card"],
      ["--draft", "--draft-soft"],
      ["--destructive", "--background"],
      ["--destructive", "--card"],
      ["--primary-foreground", "--primary"],
      ["--night-foreground", "--night"],
      ["--night-muted", "--night"],
      ["--night-accent", "--night"],
    ];

    for (const [fg, bg] of textPairs) {
      expect(
        contrastRatio(requireToken(light, fg), requireToken(light, bg)),
        `light ${fg} on ${bg}`
      ).toBeGreaterThanOrEqual(AA_TEXT_MIN);
      expect(
        contrastRatio(requireToken(dark, fg), requireToken(dark, bg)),
        `dark ${fg} on ${bg}`
      ).toBeGreaterThanOrEqual(AA_TEXT_MIN);
    }
  });

  it("keeps all interactive and semantic borders >= 3.0:1 (WCAG 1.4.11)", () => {
    const borderPairs: readonly [string, string][] = [
      ["--input", "--background"],
      ["--input", "--card"],
      ["--rule-interactive", "--background"],
      ["--rule-interactive", "--card"],
      ["--pine-border", "--background"],
      ["--pine-border", "--card"],
      ["--pine-border", "--pine-soft"],
      ["--vermilion-border", "--background"],
      ["--vermilion-border", "--card"],
      ["--vermilion-border", "--vermilion-soft"],
      ["--draft-border", "--background"],
      ["--draft-border", "--card"],
      ["--draft-border", "--draft-soft"],
      ["--destructive-border", "--background"],
      ["--destructive-border", "--card"],
    ];

    for (const [fg, bg] of borderPairs) {
      expect(
        contrastRatio(requireToken(light, fg), requireToken(light, bg)),
        `light ${fg} on ${bg}`
      ).toBeGreaterThanOrEqual(AA_NON_TEXT_MIN);
      expect(
        contrastRatio(requireToken(dark, fg), requireToken(dark, bg)),
        `dark ${fg} on ${bg}`
      ).toBeGreaterThanOrEqual(AA_NON_TEXT_MIN);
    }
  });

  it("keeps app/error.tsx free of sub-AA vermilion opacity tokens", () => {
    const errorSource = readFileSync(
      path.join(process.cwd(), "app", "error.tsx"),
      "utf-8"
    );
    expect(errorSource).not.toContain("text-primary/82");
    expect(errorSource).toContain("text-destructive");
    expect(errorSource).not.toContain("font-semibold");
  });
});

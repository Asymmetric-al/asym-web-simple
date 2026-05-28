import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  allLetterParagraphs,
  heroTitle,
  typographyAuditStrings,
} from "../lib/content/home-letter";

type HeroAuditTarget = {
  label: string;
  width: number;
  font: string;
  lineHeight: number;
  maxLines: number;
};

type ParagraphAuditTarget = {
  label: string;
  width: number;
  font: string;
  lineHeight: number;
};

type BrowserAuditPayload = {
  heroText: string;
  heroTargets: HeroAuditTarget[];
  paragraphTargets: ParagraphAuditTarget[];
  paragraphs: string[];
};

type BrowserAuditResult = {
  errors: string[];
  warnings: string[];
};

const root = process.cwd();
const errors: string[] = [];
const warnings: string[] = [];

function requiredParagraph(
  label: string,
  predicate: (paragraph: string) => boolean
): string {
  const paragraph = allLetterParagraphs.find(predicate);

  if (!paragraph) {
    throw new Error(`Missing typography audit paragraph: ${label}`);
  }

  return paragraph;
}

function cssBlock(css: string, selector: string): string {
  const selectorIndex = css.indexOf(selector);

  if (selectorIndex === -1) {
    return "";
  }

  const openBrace = css.indexOf("{", selectorIndex);
  const closeBrace = css.indexOf("}", openBrace);

  if (openBrace === -1 || closeBrace === -1) {
    return "";
  }

  return css.slice(selectorIndex, closeBrace + 1);
}

async function auditSourceAndCss(): Promise<void> {
  const content = typographyAuditStrings.join("\n");
  const css = await readFile(resolve(root, "app/globals.css"), "utf8");

  if (content.includes("\u00ad")) {
    errors.push("Letter content contains a soft hyphen character.");
  }

  if (content.includes("&shy;")) {
    errors.push("Letter content contains an HTML soft hyphen entity.");
  }

  if (/hyphens\s*:\s*auto\b/.test(css)) {
    errors.push("app/globals.css still contains `hyphens: auto`.");
  }

  const headingBlock = cssBlock(css, "h1,");
  if (/overflow-wrap\s*:\s*anywhere\b/.test(headingBlock)) {
    errors.push("Heading defaults still use `overflow-wrap: anywhere`.");
  }

  const proseBlocks = Array.from(
    css.matchAll(/:where\(main,\s*header,\s*footer\)[\s\S]*?\}/g)
  ).map((match) => match[0]);

  if (
    proseBlocks.some((block) =>
      /overflow-wrap\s*:\s*anywhere\b/.test(block)
    )
  ) {
    errors.push("A broad main/header/footer text rule still uses `anywhere`.");
  }

  for (const selector of [
    ".content-measure",
    ".letter-prose",
    ".letter-copy",
    ".text-resilient",
  ]) {
    const block = cssBlock(css, selector);

    if (!block) {
      errors.push(`${selector} is missing from app/globals.css.`);
      continue;
    }

    if (/overflow-wrap\s*:\s*anywhere\b/.test(block)) {
      errors.push(`${selector} still uses \`overflow-wrap: anywhere\`.`);
    }
  }
}

function browserAuditProgram(payload: BrowserAuditPayload): string {
  return `
import { chromium } from "playwright";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const payload = ${JSON.stringify(payload)};
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

await page.route("http://pretext.local/*", async (route) => {
  const url = new URL(route.request().url());
  const filePath = resolve(
    process.cwd(),
    "node_modules/@chenglou/pretext/dist",
    url.pathname.slice(1)
  );
  await route.fulfill({
    status: 200,
    contentType: "text/javascript",
    body: await readFile(filePath, "utf8"),
  });
});

await page.setContent(\`<!doctype html><meta charset="utf-8"><script type="module">
import { prepare, layout, prepareWithSegments, layoutWithLines } from "http://pretext.local/layout.js";

window.runTypographyAudit = (payload) => {
  const errors = [];
  const warnings = [];

  for (const target of payload.heroTargets) {
    const prepared = prepare(payload.heroText, target.font, {
      whiteSpace: "normal",
    });
    const result = layout(prepared, target.width, target.lineHeight);

    if (result.lineCount > target.maxLines) {
      errors.push(
        \\\`Hero wraps at \\\${target.label}: \\\${result.lineCount} lines at \\\${target.width}px.\\\`
      );
    }
  }

  for (const paragraph of payload.paragraphs) {
    for (const target of payload.paragraphTargets) {
      const prepared = prepareWithSegments(paragraph, target.font, {
        whiteSpace: "normal",
      });
      const result = layoutWithLines(prepared, target.width, target.lineHeight);
      let searchStart = 0;

      result.lines.forEach((line, index) => {
        const text = line.text.trim();
        const isFinalLine = index === result.lines.length - 1;
        const sourceIndex = paragraph.indexOf(text, searchStart);

        if (!text) {
          return;
        }

        if (sourceIndex >= 0) {
          searchStart = sourceIndex + text.length;
        }

        const nextSourceCharacter =
          sourceIndex >= 0 ? paragraph[sourceIndex + text.length] : "";
        const isSourceAuthoredHyphenBreak =
          text.endsWith("-") &&
          Boolean(nextSourceCharacter) &&
          /[\\p{Letter}\\p{Number}]/u.test(nextSourceCharacter);

        if (text.endsWith("-") && !isSourceAuthoredHyphenBreak) {
          warnings.push(
            \\\`Line ends with a hyphen in \\\${target.label}: "\\\${text}"\\\`
          );
        }

        if (!isFinalLine && text.length < 18) {
          warnings.push(
            \\\`Very short non-final line in \\\${target.label}: "\\\${text}"\\\`
          );
        }

        if (isFinalLine) {
          const words = text.split(/\\\\s+/).filter(Boolean);

          if (words.length === 1 && text.length < 14) {
            warnings.push(
              \\\`Very short final line in \\\${target.label}: "\\\${text}"\\\`
            );
          }
        }
      });
    }
  }

  return { errors, warnings };
};
</script>\`);

await page.waitForFunction(() => window.runTypographyAudit, null, {
  timeout: 5000,
});
const result = await page.evaluate((payload) => {
  return window.runTypographyAudit(payload);
}, payload);

console.log(JSON.stringify(result));
await browser.close();
`;
}

function runBrowserAudit(payload: BrowserAuditPayload): BrowserAuditResult {
  const result = spawnSync("node", ["--input-type=module"], {
    cwd: root,
    encoding: "utf8",
    input: browserAuditProgram(payload),
    timeout: 30_000,
  });

  if (result.error) {
    return {
      errors: [`Unable to run Pretext browser audit: ${result.error.message}`],
      warnings: [],
    };
  }

  if (result.status !== 0) {
    return {
      errors: [
        "Pretext browser audit failed.",
        result.stderr.trim(),
        result.stdout.trim(),
      ].filter(Boolean),
      warnings: [],
    };
  }

  try {
    return JSON.parse(result.stdout.trim()) as BrowserAuditResult;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      errors: [`Unable to parse Pretext audit output: ${message}`],
      warnings: [result.stdout.trim()].filter(Boolean),
    };
  }
}

await auditSourceAndCss();

const paragraphSamples = [
  requiredParagraph("intro", (paragraph) =>
    paragraph.startsWith("Asym is a product")
  ),
  requiredParagraph("vision", (paragraph) =>
    paragraph.startsWith("Christian missions organizations should not need")
  ),
  requiredParagraph("ownership", (paragraph) =>
    paragraph.startsWith("You might work on the donor portal")
  ),
];

const browserResult = runBrowserAudit({
  heroText: heroTitle,
  heroTargets: [
    {
      label: "1024 laptop",
      width: 960,
      font: "700 64px Plus Jakarta Sans, Arial, sans-serif",
      lineHeight: 59,
      maxLines: 1,
    },
    {
      label: "1280 desktop",
      width: 1216,
      font: "700 78px Plus Jakarta Sans, Arial, sans-serif",
      lineHeight: 72,
      maxLines: 1,
    },
    {
      label: "1440 desktop",
      width: 1216,
      font: "700 88px Plus Jakarta Sans, Arial, sans-serif",
      lineHeight: 81,
      maxLines: 1,
    },
  ],
  paragraphTargets: [
    {
      label: "375 mobile",
      width: 327,
      font: "400 17px Inter, Arial, sans-serif",
      lineHeight: 29,
    },
    {
      label: "768 tablet",
      width: 640,
      font: "400 18px Inter, Arial, sans-serif",
      lineHeight: 31,
    },
    {
      label: "1024 laptop",
      width: 860,
      font: "400 19px Inter, Arial, sans-serif",
      lineHeight: 33,
    },
    {
      label: "1280 desktop",
      width: 1024,
      font: "400 19px Inter, Arial, sans-serif",
      lineHeight: 33,
    },
  ],
  paragraphs: paragraphSamples,
});

errors.push(...browserResult.errors);
warnings.push(...browserResult.warnings);

for (const warning of warnings) {
  console.warn(`Typography warning: ${warning}`);
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`Typography error: ${error}`);
  }

  process.exit(1);
}

console.log("Typography audit passed.");

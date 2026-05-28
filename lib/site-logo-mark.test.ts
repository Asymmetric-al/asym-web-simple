import { SiteLogoMark } from "../components/site/site-logo-mark";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";

describe("SiteLogoMark", () => {
  test("does not preload logo artwork by default", () => {
    const markup = renderToStaticMarkup(
      createElement(SiteLogoMark, { className: "size-5" })
    );

    expect(markup).not.toContain('rel="preload"');
  });
});

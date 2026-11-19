import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SiteLogoMark } from "../components/site/site-logo-mark";

describe("siteLogoMark", () => {
  it("does not preload logo artwork by default", () => {
    const markup = renderToStaticMarkup(
      createElement(SiteLogoMark, { className: "size-5" })
    );

    expect(markup).not.toContain('rel="preload"');
  });
});

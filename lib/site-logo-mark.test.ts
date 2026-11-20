import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SiteLogoMark } from "../components/site/site-logo-mark";

describe("siteLogoMark", () => {
  it("renders inline vector mark geometry without image preload hints", () => {
    const markup = renderToStaticMarkup(
      createElement(SiteLogoMark, { className: "size-5", eager: true })
    );

    expect(markup).toContain("<svg");
    expect(markup).not.toContain("<img");
    expect(markup).not.toContain('rel="preload"');
  });
});

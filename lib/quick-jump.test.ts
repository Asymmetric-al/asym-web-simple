import { describe, expect, it } from "vitest";
import { buildQuickJumpItems, filterQuickJumpItems } from "@/lib/quick-jump";

describe("quick jump catalog and search", () => {
  it("adapts early-access action to configured vs. unconfigured mode", () => {
    const configured = buildQuickJumpItems(true);
    const unconfigured = buildQuickJumpItems(false);

    expect(
      configured.find((item) => item.id === "section-early-access")?.action
    ).toStrictEqual({ type: "route", href: "/#early-access" });
    expect(
      unconfigured.find((item) => item.id === "section-early-access")?.action
    ).toStrictEqual({
      type: "route",
      href: "/early-access/status?state=unavailable",
    });
  });

  it("ranks title matches first across multi-term queries", () => {
    const items = buildQuickJumpItems(false);
    const parallelMatches = filterQuickJumpItems(items, "parallel close");

    expect(parallelMatches[0]?.id).toBe("eval-migration");

    const stripeMatches = filterQuickJumpItems(items, "stripe custody");
    expect(stripeMatches[0]?.id).toBe("code-stripe");
  });

  it("returns all items on blank query, empty array on miss, and omits GitHub issues", () => {
    const items = buildQuickJumpItems(true);

    expect(filterQuickJumpItems(items, " ".repeat(3))).toHaveLength(
      items.length
    );
    expect(filterQuickJumpItems(items, "nonexistent-xyz-query")).toStrictEqual(
      []
    );
    expect(
      items.some(
        (item) =>
          item.action.type !== "theme" &&
          item.action.href.includes("Asymmetric-al/core/issues")
      )
    ).toBeFalsy();
  });
});

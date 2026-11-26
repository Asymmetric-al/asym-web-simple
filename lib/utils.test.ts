import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn utility (compiled Tailwind v4 tables)", () => {
  it("merges conflicting standard Tailwind utilities cleanly", () => {
    expect(cn("px-4 py-2", "px-6")).toBe("py-2 px-6");
    expect(cn("rounded-2xl", "rounded-full")).toBe("rounded-full");
  });

  it("merges custom @theme inline color and font utilities from app/globals.css", () => {
    expect(cn("text-foreground", "text-signal")).toBe("text-signal");
    expect(cn("bg-card", "bg-record")).toBe("bg-record");
    expect(cn("border-rule", "border-rule-strong")).toBe("border-rule-strong");
    expect(cn("font-sans", "font-heading")).toBe("font-heading");
  });

  it("handles conditional, falsy, array, and object clsx inputs", () => {
    const isActive = true;
    const isDisabled = false;
    expect(
      cn(
        "inline-flex",
        isActive && "bg-primary",
        isDisabled && "opacity-50",
        ["gap-2", null, undefined],
        { "px-4": true, "px-8": false }
      )
    ).toBe("inline-flex bg-primary gap-2 px-4");
  });
});

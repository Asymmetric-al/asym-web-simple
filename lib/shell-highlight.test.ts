import { describe, expect, it } from "vitest";
import { tokenizeShellLine } from "@/lib/shell-highlight";

describe("tokenizeShellLine", () => {
  it("classifies commands, operators, targets, and plain arguments", () => {
    const tokens = tokenizeShellLine(
      "cd core && bun run setup:mission-control:cloud"
    );

    expect(tokens.filter((token) => token.text.trim().length > 0)).toStrictEqual([
      { kind: "command", text: "cd" },
      { kind: "plain", text: "core" },
      { kind: "operator", text: "&&" },
      { kind: "command", text: "bun" },
      { kind: "plain", text: "run" },
      { kind: "target", text: "setup:mission-control:cloud" },
    ]);
  });

  it("highlights repository clone URLs as targets without altering whitespace", () => {
    const line = "git clone https://github.com/Asymmetric-al/core.git";
    const tokens = tokenizeShellLine(line);

    expect(tokens.map((token) => token.text).join("")).toBe(line);
    expect(tokens.find((token) => token.kind === "command")?.text).toBe("git");
    expect(tokens.find((token) => token.kind === "target")?.text).toBe(
      "https://github.com/Asymmetric-al/core.git"
    );
  });
});

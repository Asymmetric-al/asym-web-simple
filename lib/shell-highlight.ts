export type ShellTokenKind = "command" | "operator" | "target" | "plain";

export interface ShellToken {
  readonly kind: ShellTokenKind;
  readonly text: string;
}

const KNOWN_COMMANDS = {
  git: true,
  cd: true,
  bun: true,
} as const;
const SHELL_OPERATORS = {
  "&&": true,
  "||": true,
  "|": true,
  ";": true,
} as const;
const TARGET_PREFIXES = ["https://", "http://", "setup:", "dev:"] as const;

const classifyToken = (
  segment: string,
  isExpectingCommand: boolean
): ShellTokenKind => {
  if (Object.hasOwn(SHELL_OPERATORS, segment)) {
    return "operator";
  }
  if (isExpectingCommand && Object.hasOwn(KNOWN_COMMANDS, segment)) {
    return "command";
  }
  if (TARGET_PREFIXES.some((prefix) => segment.startsWith(prefix))) {
    return "target";
  }
  return "plain";
};

/**
Zero-dependency semantic shell line tokenizer inspired by ReUI's token-mapped code block theming.
*/
export const tokenizeShellLine = (line: string): readonly ShellToken[] => {
  const parts = line.match(/\s+|\S+/gu) ?? [];
  const tokens: ShellToken[] = [];
  let isExpectingCommand = true;

  for (const part of parts) {
    if (/^\s+$/u.test(part)) {
      tokens.push({ kind: "plain", text: part });
    } else {
      const kind = classifyToken(part, isExpectingCommand);
      tokens.push({ kind, text: part });

      if (kind === "operator") {
        isExpectingCommand = true;
      } else if (isExpectingCommand) {
        isExpectingCommand = false;
      }
    }
  }

  return tokens;
};

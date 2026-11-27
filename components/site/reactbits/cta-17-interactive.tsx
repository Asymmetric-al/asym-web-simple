"use client";

import {
  SegmentedControl,
  SegmentedControlItem,
} from "@ui-sdk/react/segmented-control";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { DeferredSegmentedIndicator } from "@/components/site/deferred-segmented-indicator";
import { tokenizeShellLine } from "@/lib/shell-highlight";
import { cn } from "@/lib/utils";
import type { ShellTokenKind } from "@/lib/shell-highlight";
import type { ReactNode } from "react";

type ModeKey = "quickstart" | "dev";

interface CommandMode {
  readonly key: ModeKey;
  readonly label: string;
  readonly command: string;
  readonly lines: readonly string[];
}

const COMMAND_MODES: readonly CommandMode[] = [
  {
    key: "quickstart",
    label: "Clone & preview",
    command:
      "git clone https://github.com/Asymmetric-al/core.git\ncd core && bun run setup:mission-control:cloud\nbun run dev:mission-control",
    lines: [
      "Clones Asymmetric-al/core (AGPL-3.0-only) locally",
      "Configures placeholder endpoints with no live accounts needed",
      "Starts Mission Control on http://localhost:3030 with Give Hope sample data",
    ],
  },
  {
    key: "dev",
    label: "Run again",
    command: "bun run dev:mission-control",
    lines: [
      "Reuses your local workspace and Payload CMS sample setup",
      "Inspects households, gift batches, and Web Studio without donor credentials",
      "Open http://localhost:3030 in your browser",
    ],
  },
];

const TOKEN_CLASS: Record<ShellTokenKind, string> = {
  command: "text-signal font-semibold",
  operator: "text-muted-foreground",
  target: "text-human",
  plain: "text-foreground",
};

const HighlightedShellCode = ({
  command,
}: {
  readonly command: string;
}): ReactNode => {
  const lines = command.split("\n");
  return (
    <code>
      {lines.map((line, lineIndex) => (
        <span key={line} className="block">
          {tokenizeShellLine(line).map((token, tokenIndex) => (
            <span
              key={`${lineIndex}-${tokenIndex}-${token.text}`}
              className={TOKEN_CLASS[token.kind]}
            >
              {token.text}
            </span>
          ))}
        </span>
      ))}
    </code>
  );
};

const isModeKey = (value: string | null): value is ModeKey =>
  value === "quickstart" || value === "dev";

const CopyButton = ({
  isCopied,
  hasCopiedOnce,
  onCopy,
}: {
  readonly isCopied: boolean;
  readonly hasCopiedOnce: boolean;
  readonly onCopy: () => void;
}): ReactNode => (
  <button
    type="button"
    onClick={onCopy}
    aria-label={isCopied ? "Commands copied" : "Copy commands"}
    className="border-rule-strong bg-ink text-background focus-visible:ring-ring focus-visible:ring-offset-card relative inline-flex min-h-10 min-w-[5.25rem] shrink-0 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-full border px-3.5 font-sans text-xs font-medium transition-transform duration-150 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] sm:min-h-8"
  >
    <span
      key={isCopied ? "copied" : "copy"}
      className={cn(
        "inline-flex items-center gap-1.5",
        hasCopiedOnce && "copy-state-enter"
      )}
    >
      {isCopied ? (
        <Check className="size-3.5" strokeWidth={2} aria-hidden="true" />
      ) : (
        <Copy className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
      )}
      <span>{isCopied ? "Copied" : "Copy"}</span>
    </span>
  </button>
);

export const Cta17Interactive = (): ReactNode => {
  const [modeKey, setModeKey] = useState<ModeKey>("quickstart");
  const [hasSwitched, setHasSwitched] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [hasCopiedOnce, setHasCopiedOnce] = useState(false);

  const activeMode =
    COMMAND_MODES.find((entry) => entry.key === modeKey) ?? COMMAND_MODES[0];

  useEffect(() => {
    let timer: number | null = null;
    if (isCopied) {
      timer = window.setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
    return () => {
      if (timer !== null) {
        window.clearTimeout(timer);
      }
    };
  }, [isCopied]);

  if (!activeMode) {
    return null;
  }

  const handleModeChange = (nextValue: string | null): void => {
    if (!isModeKey(nextValue)) {
      return;
    }
    setHasSwitched(true);
    setModeKey(nextValue);
    setIsCopied(false);
  };

  const handleCopy = (): void => {
    if (!navigator.clipboard?.writeText) {
      setIsCopied(false);
      return;
    }
    navigator.clipboard
      .writeText(activeMode.command)
      .then(() => {
        setHasCopiedOnce(true);
        setIsCopied(true);
        return true;
      })
      .catch(() => {
        setIsCopied(false);
        return false;
      });
  };

  return (
    <div className="border-rule-strong bg-card min-w-0 rounded-2xl border p-2 shadow-[var(--shadow-card)]">
      <div className="flex flex-wrap items-center justify-between gap-2 p-2">
        <SegmentedControl
          aria-label="Local setup command"
          value={modeKey}
          onValueChange={handleModeChange}
          className="border-rule bg-record has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-card relative isolate inline-flex items-center rounded-full border p-1 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-2 forced-colors:border-[ButtonBorder]"
        >
          <DeferredSegmentedIndicator className="segmented-indicator" />
          {COMMAND_MODES.map((mode) => (
            <SegmentedControlItem
              key={mode.key}
              value={mode.key}
              className={cn(
                "text-muted-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground relative z-10 inline-flex min-h-10 cursor-pointer items-center rounded-full border border-transparent px-3 font-mono text-xs font-medium whitespace-nowrap transition-transform duration-150 ease-out select-none focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] sm:min-h-8",
                "data-checked:text-foreground",
                "forced-colors:data-checked:border-[Highlight] forced-colors:data-checked:bg-[Highlight] forced-colors:data-checked:text-[HighlightText] forced-colors:data-checked:forced-color-adjust-none"
              )}
            >
              <span>{mode.label}</span>
            </SegmentedControlItem>
          ))}
        </SegmentedControl>

        <CopyButton
          isCopied={isCopied}
          hasCopiedOnce={hasCopiedOnce}
          onCopy={handleCopy}
        />
      </div>

      <div className="bg-record/70 rounded-xl px-4 py-4 font-mono sm:px-5 sm:py-5">
        <pre
          key={activeMode.key}
          className={cn(
            "text-foreground link-resilient text-xs leading-6 whitespace-pre-wrap",
            hasSwitched && "surface-enter"
          )}
        >
          <HighlightedShellCode command={activeMode.command} />
        </pre>

        {/* Non-list rows inside #open-source keep StatusLedger as the sole <ul>/<li> inventory */}
        <div className="border-rule mt-4 flex flex-col gap-2 border-t pt-3.5 font-sans text-xs leading-5">
          {activeMode.lines.map((line) => (
            <div
              key={line}
              className="text-muted-foreground flex items-start gap-2.5"
            >
              <Check
                aria-hidden="true"
                className="text-signal mt-0.5 size-3.5 shrink-0"
                strokeWidth={2}
              />
              <span className="min-w-0">{line}</span>
            </div>
          ))}
        </div>
        <span className="sr-only" aria-live="polite">
          {isCopied ? "Local setup commands copied to clipboard." : ""}
        </span>
      </div>
    </div>
  );
};

"use client";

import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
} from "@ui-sdk/react/segmented-control";
import { Check, Copy } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { GitHubMark } from "@/components/site/github-mark";
import { ArrowUpRightIcon } from "@/components/site/icons";
import { repoStats, siteConfig } from "@/lib/config";
import { tokenizeShellLine } from "@/lib/shell-highlight";
import { useIsClient } from "@/lib/use-is-client";
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

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

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
  isReducedMotion,
  onCopy,
}: {
  readonly isCopied: boolean;
  readonly isReducedMotion: boolean;
  readonly onCopy: () => void;
}): ReactNode => (
  <button
    type="button"
    onClick={onCopy}
    aria-label={isCopied ? "Commands copied" : "Copy commands"}
    className="border-rule-strong bg-ink text-background focus-visible:ring-ring focus-visible:ring-offset-card relative inline-flex min-h-10 min-w-[5.25rem] shrink-0 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-full border px-3.5 font-sans text-xs font-medium transition-transform duration-150 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] sm:min-h-8"
  >
    <AnimatePresence mode="popLayout" initial={false}>
      <m.span
        key={isCopied ? "copied" : "copy"}
        initial={
          isReducedMotion
            ? false
            : { opacity: 0, scale: 0.92, filter: "blur(2px)" }
        }
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={
          isReducedMotion
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.92, filter: "blur(2px)" }
        }
        transition={{ duration: isReducedMotion ? 0 : 0.14, ease: EASE }}
        className="inline-flex items-center gap-1.5"
      >
        {isCopied ? (
          <Check className="size-3.5" strokeWidth={2} aria-hidden="true" />
        ) : (
          <Copy className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
        )}
        <span>{isCopied ? "Copied" : "Copy"}</span>
      </m.span>
    </AnimatePresence>
  </button>
);

const EvaluatorIntro = (): ReactNode => (
  <div className="min-w-0">
    <p className="text-signal font-sans text-xs font-medium">
      For your IT lead or technical reviewer
    </p>
    <h3 className="font-heading text-foreground mt-1.5 text-lg font-semibold tracking-[-0.02em] sm:text-xl">
      Run Mission Control on your laptop without credentials.
    </h3>
    <p className="text-muted-foreground mt-2 text-sm leading-6 text-pretty">
      Clone Core to explore the interface, Web Studio, and architecture locally
      on port 3030 using safe sample data. No live donor records or external
      accounts required.
    </p>

    <div className="border-rule mt-5 border-t pt-4">
      <p className="text-foreground font-mono text-xs font-medium">
        {repoStats.commits} {repoStats.commitsScope} ·{" "}
        {repoStats.mergedPullRequests} {repoStats.mergedPullRequestsScope}
      </p>
      <p className="text-muted-foreground mt-1.5 text-sm leading-6 text-pretty">
        Public source, written OpenSpec requirements, and architecture decision
        records developed in the open since {repoStats.since} (
        <a
          href={repoStats.verifiedCommitUrl}
          target="_blank"
          rel="noopener noreferrer"
          translate="no"
          className="text-foreground focus-visible:ring-ring rounded-xs font-mono text-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
        >
          {repoStats.verifiedCommit}
          <span className="sr-only">
            {" "}
            in Asymmetric-al/core (opens in a new tab)
          </span>
        </a>
        ).
      </p>
    </div>

    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1">
      <a
        href={siteConfig.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-medium whitespace-nowrap focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
      >
        <GitHubMark className="size-4" />
        <span className="underline underline-offset-4">
          Explore the code on GitHub
        </span>
        <span className="sr-only"> (opens in a new tab)</span>
        <ArrowUpRightIcon />
      </a>
      <a
        href={`${siteConfig.repoUrl}/tree/develop/openspec`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center gap-1 rounded-full font-mono text-xs font-medium whitespace-nowrap underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
      >
        openspec/
        <ArrowUpRightIcon className="size-3.5" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a
        href={`${siteConfig.repoUrl}/tree/develop/docs/adr`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center gap-1 rounded-full font-mono text-xs font-medium whitespace-nowrap underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
      >
        docs/adr/
        <ArrowUpRightIcon className="size-3.5" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  </div>
);

export const Cta17 = (): ReactNode => {
  const isHydrated = useIsClient();
  const isReducedMotion = Boolean(useReducedMotion());
  const [modeKey, setModeKey] = useState<ModeKey>("quickstart");
  const [hasSwitched, setHasSwitched] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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
    navigator.clipboard
      .writeText(activeMode.command)
      .then(() => {
        setIsCopied(true);
        return true;
      })
      .catch(() => {
        setIsCopied(false);
        return false;
      });
  };

  return (
    <div className="border-rule-strong bg-record/65 mt-5 rounded-2xl border p-6 sm:p-7">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,46fr)_minmax(0,54fr)] lg:items-center lg:gap-10">
        <EvaluatorIntro />

        <div className="border-rule-strong bg-card min-w-0 rounded-2xl border p-2 shadow-[var(--shadow-card)]">
          <div className="flex flex-wrap items-center justify-between gap-2 p-2">
            {isHydrated ? (
              <SegmentedControl
                aria-label="Local setup command"
                value={modeKey}
                onValueChange={handleModeChange}
                className="border-rule bg-record has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-card relative isolate inline-flex items-center rounded-full border p-1 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-2 forced-colors:border-[ButtonBorder]"
              >
                <SegmentedControlIndicator className="segmented-indicator" />
                {COMMAND_MODES.map((mode) => (
                  <SegmentedControlItem
                    key={mode.key}
                    value={mode.key}
                    className={cn(
                      "text-muted-foreground relative z-10 inline-flex min-h-10 cursor-pointer items-center rounded-full border border-transparent px-3 font-mono text-xs font-medium whitespace-nowrap transition-transform duration-150 ease-out select-none focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
                      "data-checked:text-foreground",
                      "forced-colors:data-checked:border-[Highlight] forced-colors:data-checked:bg-[Highlight] forced-colors:data-checked:text-[HighlightText] forced-colors:data-checked:forced-color-adjust-none"
                    )}
                  >
                    <span>{mode.label}</span>
                  </SegmentedControlItem>
                ))}
              </SegmentedControl>
            ) : (
              <span className="text-muted-foreground px-2 font-mono text-xs font-medium">
                Clone &amp; preview · bun
              </span>
            )}

            {isHydrated ? (
              <CopyButton
                isCopied={isCopied}
                isReducedMotion={isReducedMotion}
                onCopy={handleCopy}
              />
            ) : null}
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
      </div>
    </div>
  );
};

export default Cta17;

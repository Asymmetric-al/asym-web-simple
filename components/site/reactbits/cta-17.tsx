import { GitHubMark } from "@/components/site/github-mark";
import { Cta17Slot } from "@/components/site/home/deferred-widget-slots";
import { ArrowUpRightIcon, CheckIcon } from "@/components/site/icons";
import { repoStats, siteConfig } from "@/lib/config";
import { tokenizeShellLine } from "@/lib/shell-highlight";
import type { ShellTokenKind } from "@/lib/shell-highlight";
import type { ReactNode } from "react";

const QUICKSTART_COMMAND =
  "git clone https://github.com/Asymmetric-al/core.git\ncd core && bun run setup:mission-control:cloud\nbun run dev:mission-control";

const QUICKSTART_LINES = [
  "Clones Asymmetric-al/core (AGPL-3.0-only) locally",
  "Configures placeholder endpoints with no live accounts needed",
  "Starts Mission Control on http://localhost:3030 with Give Hope sample data",
] as const;

const TOKEN_CLASS: Record<ShellTokenKind, string> = {
  command: "text-signal font-semibold",
  operator: "text-muted-foreground",
  target: "text-human",
  plain: "text-foreground",
};

export const Cta17 = (): ReactNode => (
  <div className="border-rule-strong bg-record/65 mt-5 rounded-2xl border p-6 sm:p-7">
    <div className="grid gap-6 lg:grid-cols-[minmax(0,46fr)_minmax(0,54fr)] lg:items-center lg:gap-10">
      <div className="min-w-0">
        <p className="text-signal font-sans text-xs font-medium">
          For your IT lead or technical reviewer
        </p>
        <h3 className="font-heading text-foreground mt-1.5 text-lg font-semibold tracking-[-0.02em] sm:text-xl">
          Run Mission Control on your laptop without credentials.
        </h3>
        <p className="text-muted-foreground mt-2 text-sm leading-6 text-pretty">
          Clone Core to explore the interface, Web Studio, and architecture
          locally on port 3030 using safe sample data. No live donor records or
          external accounts required.
        </p>

        <div className="border-rule mt-5 border-t pt-4">
          <p className="text-foreground font-mono text-xs font-medium">
            {repoStats.commits} {repoStats.commitsScope} ·{" "}
            {repoStats.mergedPullRequests} {repoStats.mergedPullRequestsScope}
          </p>
          <p className="text-muted-foreground mt-1.5 text-sm leading-6 text-pretty">
            Public source, written OpenSpec requirements, and architecture
            decision records developed in the open since {repoStats.since} (
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

      <Cta17Slot>
        <div className="border-rule-strong bg-card min-w-0 rounded-2xl border p-2 shadow-[var(--shadow-card)]">
          <div className="flex flex-wrap items-center justify-between gap-2 p-2">
            <span className="text-muted-foreground inline-flex min-h-12 items-center px-2 font-mono text-xs font-medium sm:min-h-10">
              Clone &amp; preview · bun
            </span>
          </div>

          <div className="bg-record/70 rounded-xl px-4 py-4 font-mono sm:px-5 sm:py-5">
            <pre className="text-foreground link-resilient text-xs leading-6 whitespace-pre-wrap">
              <code>
                {QUICKSTART_COMMAND.split("\n").map((line, lineIndex) => (
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
            </pre>

            <div className="border-rule mt-4 flex flex-col gap-2 border-t pt-3.5 font-sans text-xs leading-5">
              {QUICKSTART_LINES.map((line) => (
                <div
                  key={line}
                  className="text-muted-foreground flex items-start gap-2.5"
                >
                  <CheckIcon className="text-signal mt-0.5 size-3.5 shrink-0" />
                  <span className="min-w-0">{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Cta17Slot>
    </div>
  </div>
);

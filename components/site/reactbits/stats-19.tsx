"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon } from "@/components/site/icons";
import { repoStats, siteConfig } from "@/lib/config";
import { useIsReducedMotion } from "@/lib/use-reduced-motion";
import type { ReactNode } from "react";

interface ProofStat {
  readonly id: string;
  readonly target: number;
  readonly prefix: string;
  readonly suffix: string;
  readonly label: string;
  readonly context: string;
  readonly source: string;
  readonly linkLabel: string;
  readonly href: string;
}

const PROOF_STATS: readonly ProofStat[] = [
  {
    id: "proof-note-1",
    target: 5200,
    prefix: "",
    suffix: "+",
    label: "Commits on develop",
    context: `Public commit history built in the open since ${repoStats.since}.`,
    source: `Verified against origin/develop (${repoStats.verifiedCommit}) in ${repoStats.asOf}; repository activity is not production readiness.`,
    linkLabel: repoStats.verifiedCommit,
    href: repoStats.verifiedCommitUrl,
  },
  {
    id: "proof-note-2",
    target: 600,
    prefix: "",
    suffix: "+",
    label: "Merged pull requests",
    context:
      "Reviewed changes across Donor portal, Missionary workspace, and Mission Control.",
    source: "Repository-wide merged pull requests in Asymmetric-al/core.",
    linkLabel: "Merged PRs",
    href: `${siteConfig.repoUrl}/pulls?q=is%3Apr+is%3Amerged`,
  },
  {
    id: "proof-note-3",
    target: 0,
    prefix: "$",
    suffix: "",
    label: "Core software license",
    context:
      "Self-host the complete platform under AGPL-3.0-only with unlimited staff, missionaries, and donors.",
    source: "GNU AGPL-3.0-only license governing Asymmetric-al/core.",
    linkLabel: "LICENSE",
    href: `${siteConfig.repoUrl}/blob/develop/LICENSE`,
  },
  {
    id: "proof-note-4",
    target: 0,
    prefix: "",
    suffix: "%",
    label: "Gift processing markup",
    context:
      "Every organization connects its own Stripe account directly, with optional donor fee-cover.",
    source: "Zero platform percentage cut on charitable gifts in Core.",
    linkLabel: "fee-policy.ts",
    href: `${siteConfig.repoUrl}/blob/develop/packages/api/src/donate/fee-policy.ts`,
  },
];

const COUNT_UP_DURATION_MS = 900;

const easeOutQuart = (progress: number): number => 1 - (1 - progress) ** 4;

const formatInteger = (value: number): string =>
  Math.round(value).toLocaleString("en-US");

const AnimatedFigure = ({
  target,
  prefix,
  suffix,
  isTriggered,
  isReducedMotion,
}: {
  readonly target: number;
  readonly prefix: string;
  readonly suffix: string;
  readonly isTriggered: boolean;
  readonly isReducedMotion: boolean;
}): ReactNode => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = spanRef.current;
    const finalText = `${prefix}${formatInteger(target)}${suffix}`;
    let frameId = 0;

    if (node && isTriggered && !isReducedMotion && target > 0) {
      let startedAt = 0;

      const tick = (now: number): void => {
        if (startedAt === 0) {
          startedAt = now;
        }
        const progress = Math.min(1, (now - startedAt) / COUNT_UP_DURATION_MS);
        const value = target * easeOutQuart(progress);
        node.textContent = `${prefix}${formatInteger(value)}${suffix}`;
        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick);
        }
      };

      frameId = window.requestAnimationFrame(tick);
    } else if (node) {
      node.textContent = finalText;
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      if (node) {
        node.textContent = finalText;
      }
    };
  }, [isReducedMotion, isTriggered, prefix, suffix, target]);

  return (
    <span ref={spanRef} className="tabular-nums">
      {prefix}
      {formatInteger(target)}
      {suffix}
    </span>
  );
};

export const Stats19 = (): ReactNode => {
  const isReducedMotion = useIsReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    const observer =
      node && !isReducedMotion
        ? new IntersectionObserver(
            (entries, activeObserver) => {
              if (entries.every((entry) => !entry.isIntersecting)) {
                return;
              }
              setIsTriggered(true);
              activeObserver.disconnect();
            },
            { rootMargin: "0px 0px -40px 0px", threshold: 0.2 }
          )
        : null;

    if (node && observer) {
      observer.observe(node);
    }

    return () => {
      observer?.disconnect();
    };
  }, [isReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="border-rule-strong bg-card mt-5 rounded-2xl border p-6 shadow-[var(--shadow-card)] sm:p-7"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-signal font-sans text-xs font-medium">
          Verified public record
        </p>
        <p className="text-muted-foreground font-mono text-xs">
          Checked {repoStats.asOf} · every figure linked to source
        </p>
      </div>

      <dl className="border-rule mt-5 grid grid-cols-1 gap-6 border-t pt-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {PROOF_STATS.map((stat, index) => (
          <div
            key={stat.id}
            className={
              index === 0
                ? "min-w-0 lg:pr-6"
                : "border-rule min-w-0 border-t pt-5 sm:border-t-0 sm:pt-0 lg:border-l lg:px-6"
            }
          >
            <dt className="text-foreground font-sans text-sm font-semibold">
              {stat.label}
              <sup className="ml-1 align-super font-mono text-xs leading-none font-medium">
                <a
                  href={`#${stat.id}`}
                  aria-label={`Source note ${index + 1} for ${stat.label}`}
                  className="text-signal focus-visible:ring-ring rounded-xs px-0.5 underline-offset-2 focus-visible:ring-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:underline"
                >
                  {index + 1}
                </a>
              </sup>
            </dt>
            <dd className="font-heading text-foreground mt-2 text-[clamp(2rem,3.4vw,2.75rem)] leading-none font-bold tracking-[-0.035em]">
              <AnimatedFigure
                target={stat.target}
                prefix={stat.prefix}
                suffix={stat.suffix}
                isTriggered={isTriggered}
                isReducedMotion={isReducedMotion}
              />
            </dd>
            <dd className="text-muted-foreground mt-2.5 text-xs leading-5 text-pretty">
              {stat.context}
            </dd>
          </div>
        ))}
      </dl>

      {/* Non-list footnote rows keep StatusLedger as the sole <ul>/<li> inside #open-source */}
      <div className="border-rule mt-6 grid gap-x-8 gap-y-2 border-t pt-4 md:grid-cols-2">
        {PROOF_STATS.map((stat, index) => (
          <div
            key={stat.id}
            id={stat.id}
            className="text-muted-foreground flex scroll-mt-24 items-baseline gap-2.5 text-xs leading-5"
          >
            <span className="text-signal shrink-0 font-mono font-medium tabular-nums">
              [{index + 1}]
            </span>
            <p className="min-w-0">
              {stat.source}{" "}
              <a
                href={stat.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground focus-visible:ring-ring [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal inline-flex items-center gap-0.5 rounded-xs font-mono font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent"
              >
                {stat.linkLabel}
                <ArrowUpRightIcon className="size-3" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

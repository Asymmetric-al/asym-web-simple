import {
  BookOpen,
  CreditCard,
  FileCheck2,
  FileCode2,
  Scale,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/site/icons";
import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/site/reui/frame";
import { IconTile } from "@/components/site/reui/icon-tile";
import { repoStats, siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface DiligenceArtifact {
  readonly title: string;
  readonly location: string;
  readonly status: "Public code" | "In Core" | "Published";
  readonly actionLabel: string;
  readonly href: string;
  readonly isExternal: boolean;
  readonly icon: typeof Scale;
}

const DILIGENCE_ARTIFACTS: readonly DiligenceArtifact[] = [
  {
    title: `Software license (${repoStats.license})`,
    location: "Asymmetric-al/core · LICENSE",
    status: "Public code",
    actionLabel: "Inspect",
    href: `${siteConfig.repoUrl}/blob/develop/LICENSE`,
    isExternal: true,
    icon: Scale,
  },
  {
    title: "Missionary donor privacy boundary",
    location: "packages/api/src/missionary-portal/donors.ts",
    status: "In Core",
    actionLabel: "Inspect",
    href: `${siteConfig.repoUrl}/blob/develop/packages/api/src/missionary-portal/donors.ts`,
    isExternal: true,
    icon: ShieldCheck,
  },
  {
    title: "Settled donor statement queries",
    location: "packages/api/src/donor-portal/statements.ts",
    status: "In Core",
    actionLabel: "Inspect",
    href: `${siteConfig.repoUrl}/blob/develop/packages/api/src/donor-portal/statements.ts`,
    isExternal: true,
    icon: FileCheck2,
  },
  {
    title: "Organization Stripe setup & fee policy",
    location: "packages/api/src/stripe/tenant-client.ts",
    status: "In Core",
    actionLabel: "Inspect",
    href: `${siteConfig.repoUrl}/blob/develop/packages/api/src/stripe/tenant-client.ts`,
    isExternal: true,
    icon: CreditCard,
  },
  {
    title: "Architecture Decision Records & OpenSpec",
    location: "Asymmetric-al/core · docs/adr/",
    status: "Public code",
    actionLabel: "Browse",
    href: `${siteConfig.repoUrl}/tree/develop/docs/adr`,
    isExternal: true,
    icon: FileCode2,
  },
  {
    title: "Website privacy policy & prelaunch terms",
    location: "asym.app/privacy",
    status: "Published",
    actionLabel: "Read",
    href: "/privacy",
    isExternal: false,
    icon: BookOpen,
  },
];

export const TrustPacket = (): ReactNode => (
  <section
    id="trust-packet"
    aria-labelledby="trust-packet-title"
    className="border-rule scroll-mt-28 border-t py-14 sm:py-18"
  >
    <div className="max-w-[44rem]">
      <p className="text-signal font-sans text-sm font-medium">
        Documents for your board and IT lead
      </p>
      <h2
        id="trust-packet-title"
        className="font-heading text-foreground mt-2 text-[clamp(1.85rem,3.4vw,2.6rem)] leading-[1.08] font-semibold tracking-[-0.03em]"
      >
        Primary documents for technical and legal review.
      </h2>
      <p className="text-muted-foreground mt-3 text-base leading-7 text-pretty">
        Share these direct source files and policies with your treasurer,
        attorney, or systems engineer. Nothing here sits behind a sales gate or
        NDA.
      </p>
    </div>

    <Frame variant="default" spacing="none" className="mt-7">
      <FrameHeader className="px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <FrameTitle>Public documents &amp; code</FrameTitle>
          <FrameDescription>
            Direct links to Asymmetric-al/core ({repoStats.verifiedCommit}) and
            asym.app policies.
          </FrameDescription>
        </div>
        <Link
          href="/statement-of-faith"
          prefetch={false}
          className="text-muted-foreground focus-visible:ring-ring inline-flex min-h-10 items-center font-mono text-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
        >
          Founders’ Statement of Faith
        </Link>
      </FrameHeader>

      <FramePanel>
        <div className="divide-rule divide-y">
          {DILIGENCE_ARTIFACTS.map((doc) => {
            const DocIcon = doc.icon;
            const isCodeStatus = doc.status !== "Published";

            return (
              <div
                key={doc.title}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-record/35"
              >
                <div className="flex min-w-0 items-start gap-3.5 sm:items-center">
                  <IconTile
                    variant={isCodeStatus ? "soft" : "frame"}
                    size="default"
                  >
                    <DocIcon aria-hidden="true" />
                  </IconTile>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-foreground font-sans text-sm font-semibold">
                        {doc.title}
                      </h3>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-xs font-medium forced-colors:border-[CanvasText]",
                          isCodeStatus
                            ? "border-signal-border/60 bg-signal-soft text-signal"
                            : "border-rule-strong bg-record text-muted-foreground"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            "size-1.5 rounded-full",
                            isCodeStatus ? "bg-signal" : "bg-muted-foreground"
                          )}
                        />
                        {doc.status}
                      </span>
                    </div>
                    <p
                      translate="no"
                      className="text-muted-foreground mt-0.5 truncate font-mono text-xs"
                    >
                      {doc.location}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-end sm:justify-start">
                  {doc.isExternal ? (
                    <a
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-rule-strong bg-card text-foreground focus-visible:ring-ring inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 font-sans text-xs font-medium transition-[transform,border-color,background-color] duration-150 ease-out select-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:border-rule-interactive [@media(hover:hover)_and_(pointer:fine)]:hover:bg-record"
                    >
                      <span>{doc.actionLabel}</span>
                      <ArrowUpRightIcon className="size-3.5" />
                      <span className="sr-only">
                        {" "}
                        {doc.title} (opens in a new tab)
                      </span>
                    </a>
                  ) : (
                    <Link
                      href={doc.href}
                      prefetch={false}
                      className="border-rule-strong bg-card text-foreground focus-visible:ring-ring inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 font-sans text-xs font-medium transition-[transform,border-color,background-color] duration-150 ease-out select-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:border-rule-interactive [@media(hover:hover)_and_(pointer:fine)]:hover:bg-record"
                    >
                      <span>{doc.actionLabel}</span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </FramePanel>
    </Frame>
  </section>
);

import { InquiryForm } from "@/components/site/inquiry-form";
import { PlatformTabs, type PlatformTabItem } from "@/components/site/platform-tabs";
import { Reveal } from "@/components/site/reveal";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ChartNoAxesCombined,
  DollarSign,
  Globe,
  Heart,
  Layers,
  Mail,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface ProblemOption {
  readonly id: string;
  readonly title: string;
  readonly icon: LucideIcon;
  readonly subtitle: string;
  readonly desc: string;
  readonly points: readonly string[];
}

interface SurfaceCard {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

const PROBLEM_OPTIONS: readonly ProblemOption[] = [
  {
    id: "diy",
    title: "OPTION A: PATCHWORK TOOLS",
    icon: Layers,
    subtitle: "Disconnected stack",
    desc: "Stitch together generic CRMs, donor tools, email tools, website builders, accounting workflows, and spreadsheets.",
    points: ["DATA GAPS", "MANUAL HANDOFFS", "STAFF DRAG"],
  },
  {
    id: "legacy",
    title: "OPTION B: LEGACY VENDORS",
    icon: Globe,
    subtitle: "Closed systems",
    desc: "Stay inside outdated, proprietary software that is difficult to modernize and hard for your team to trust long term.",
    points: ["VENDOR LOCK-IN", "LIMITED VISIBILITY", "SLOW CHANGE"],
  },
] as const;

const PLATFORM_TABS: readonly PlatformTabItem[] = [
  {
    id: "donor-care",
    title: "Donor Care",
    tag: "DONOR CARE",
    summary:
      "Keep donor questions, giving follow-through, receipts, and relationship context connected instead of scattered across inboxes and separate systems.",
    details: [
      "Shared donor context for support, finance, and advancement teams",
      "Clear follow-through on routine donor questions and updates",
      "Statements, receipts, and reporting tied back to the same records",
    ],
  },
  {
    id: "missionary-support",
    title: "Missionary Support",
    tag: "MISSIONARY SUPPORT",
    summary:
      "Help finance, mobilization, member care, and leadership stay aligned around the people they are supporting instead of rebuilding context in side systems.",
    details: [
      "Role-aware views for operators, finance staff, and care teams",
      "Shared records reduce manual handoffs and duplicate notes",
      "Missionary support stays connected to the rest of mission operations",
    ],
  },
  {
    id: "mobilize",
    title: "Mobilize",
    tag: "MOBILIZE",
    summary:
      "Visual workflow orchestration for candidates, onboarding, and deployment using Zapier's ecosystem without spaghetti logic.",
    details: [
      "Move people from inquiry to deployment with clear next steps",
      "Keep forms, signatures, and milestones tied to one workflow",
      "Reduce admin drag without forcing teams into brittle process hacks",
    ],
  },
  {
    id: "reporting",
    title: "Reporting",
    tag: "REPORTING",
    summary:
      "Pull statements, reports, and leadership visibility from the same source of truth instead of exporting from disconnected systems and reconciling later.",
    details: [
      "Statements and reporting from the same mission-built system",
      "Cleaner leadership visibility across donor care and operations",
      "Audit-friendly outputs with less spreadsheet cleanup",
    ],
  },
] as const;

const SURFACE_CARDS: readonly SurfaceCard[] = [
  {
    title: "Donor self-service",
    description:
      "Donors can manage recurring gifts, receipts, payment methods, and account changes without sending staff back into manual support loops.",
    icon: Mail,
  },
  {
    title: "Missionary dashboard",
    description:
      "Missionaries can see support progress, new donors, at-risk recurring, tasks, and next actions without waiting on staff to stitch the answer together.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Statements and reporting",
    description:
      "Finance can move with stronger statement, reporting, and reconciliation handoff flows instead of rebuilding the story from exports every cycle.",
    icon: DollarSign,
  },
];

const TRUST_POINTS: readonly SurfaceCard[] = [
  {
    title: "Ownership and trust",
    description:
      "Your organization should own the data, keys, branding, and domains that carry the work instead of outsourcing trust to a black box.",
    icon: ShieldCheck,
  },
  {
    title: "Open-source foundations",
    description:
      "Transparency, stewardship, and long-term trust matter. Most teams simply use Asym as a supported system, but the foundations stay open and inspectable.",
    icon: Globe,
  },
  {
    title: "Mission reality first",
    description:
      "Donor care, missionary support, statements, reporting, and operations were designed together so the product does not feel like a stack of bolt-ons.",
    icon: Heart,
  },
] as const;

const DitherGrid = () => (
  <div
    className="pointer-events-none fixed inset-0 z-0 opacity-10"
    style={{
      backgroundImage:
        "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}
  />
);

const DitherGlobe = ({ scale = 1.2, className = "" }) => (
  <div
    className={cn(
      "pointer-events-none select-none opacity-20 mix-blend-screen",
      className,
    )}
    style={{
      transform: `scale(${scale})`,
      background:
        "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0) 70%)",
      width: "min(80vw, 80vh)",
      height: "min(80vw, 80vh)",
      borderRadius: "50%",
      filter: "blur(60px)",
    }}
  />
);

const FalseChoicePanel = memo(({ option }: { option: ProblemOption }) => {
  const isDIY = option.id === "diy";
  const borderColor = isDIY
    ? "group-hover:border-orange-500/50 dark:group-hover:border-orange-500/30"
    : "group-hover:border-blue-500/50 dark:group-hover:border-blue-500/30";
  const iconColor = isDIY
    ? "text-orange-600 dark:text-orange-500"
    : "text-blue-600 dark:text-blue-500";
  const subtitleColor = isDIY
    ? "text-orange-600 dark:text-orange-400"
    : "text-blue-600 dark:text-blue-400";
  const lineColor = isDIY ? "bg-orange-500/50" : "bg-blue-500/50";

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors duration-500",
        borderColor,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 text-border opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      >
        <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-current" />
        <div className="absolute right-0 top-0 h-2 w-2 border-r border-t border-current" />
        <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-current" />
        <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-current" />
      </div>

      <div className="relative z-10 flex h-full flex-col p-8 md:p-10">
        <div className="mb-10 flex items-start justify-between">
          <div
            className={cn(
              "rounded-sm border border-border bg-secondary p-3 transition-colors",
              iconColor,
            )}
          >
            <option.icon size={24} strokeWidth={1.5} />
          </div>
          <span className="rounded-sm border border-border bg-secondary px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {option.title.split(":")[0]}
          </span>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-foreground/90">
            {option.title.split(":")[1]?.trim()}
          </h3>
          <div
            className={cn(
              "mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest",
              subtitleColor,
            )}
          >
            <div className={cn("h-px w-6", lineColor)} />
            {option.subtitle}
          </div>
          <p className="border-l border-border pl-6 text-balance text-sm leading-relaxed text-muted-foreground">
            {option.desc}
          </p>
        </div>

        <div className="mt-auto border-t border-border pt-8">
          <div className="mb-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            What teams feel
          </div>
          <ul className="space-y-4">
            {option.points.map((point) => (
              <li
                key={point}
                className="group/list flex items-center gap-3 font-mono text-[11px] text-muted-foreground"
              >
                <div className="h-1 w-1 rounded-full bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <span className="tracking-wider transition-colors group-hover/list:text-foreground">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});
FalseChoicePanel.displayName = "FalseChoicePanel";

const SurfacePanel = memo(({ item }: { item: SurfaceCard }) => (
  <div className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors duration-300 hover:border-foreground/20">
    <div className="flex items-start justify-between border-b border-border bg-card p-8">
      <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-secondary text-muted-foreground transition-colors group-hover:border-foreground/30 group-hover:text-foreground">
        <item.icon size={20} strokeWidth={1.5} />
      </div>
      <span className="mt-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
        SYSTEM SURFACE
      </span>
    </div>
    <div className="p-8">
      <h3 className="mb-4 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
        {item.title}
      </h3>
      <p className="text-balance text-sm font-light leading-relaxed text-muted-foreground">
        {item.description}
      </p>
    </div>
  </div>
));
SurfacePanel.displayName = "SurfacePanel";

function DeploymentForm() {
  return <InquiryForm kind="waitlist" />;
}

export const metadata: Metadata = createMetadata({
  title: "One Mission-Built System for Christian Missions",
  description:
    "See how Asym replaces disconnected tools and manual handoffs with one mission-built system for donor care, missionary support, statements, reporting, and operations.",
  path: "/platform",
});

export default function PlatformPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen overflow-hidden bg-background pt-24 text-foreground selection:bg-foreground selection:text-background"
    >
      <DitherGrid />
      <div className="pointer-events-none fixed right-0 top-1/2 z-0 hidden translate-x-1/3 -translate-y-1/2 lg:block">
        <DitherGlobe scale={1.6} />
      </div>

      <section className="relative border-b border-border bg-background pb-12 md:pb-24">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="max-w-4xl">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                <span>MISSION-BUILT SYSTEM</span>
              </div>

              <h1 className="mb-8 max-w-[12ch] text-5xl font-bold leading-[0.92] tracking-tighter text-foreground md:text-7xl">
                One mission-built system instead of a pile of tools.
              </h1>

              <div className="mb-12 border-l-2 border-border pl-6">
                <p className="max-w-3xl text-xl font-light leading-relaxed text-balance text-muted-foreground">
                  Asym replaces disconnected tools and manual handoffs with one place for donor care, missionary support, statements, reporting, and operations.
                </p>
                <p className="mt-4 max-w-3xl text-lg font-light leading-relaxed text-balance text-muted-foreground">
                  Your staff stops bouncing between tools. Donors stop waiting on staff for basic account changes. Missionaries stop guessing what changed. Finance stops chasing cleaner records at month-end.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/waitlist"
                  className="inline-flex items-center justify-center rounded-sm bg-foreground px-6 py-3 font-medium text-background transition-colors hover:bg-primary"
                >
                  Join the Waitlist
                </Link>
                <Link
                  href="#portal-walkthrough"
                  className="inline-flex items-center justify-center rounded-sm border border-border px-6 py-3 font-medium transition-colors hover:bg-secondary"
                >
                  See the Donor and Missionary Portal Walkthrough
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border bg-card py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="grid grid-cols-1 items-stretch gap-16 lg:grid-cols-12 lg:gap-24">
              <div className="flex flex-col justify-center lg:col-span-5">
                <h2 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl">
                  Old software and patchwork workflows create drag.
                </h2>
                <div className="rounded-sm border border-destructive/20 bg-destructive/5 p-8">
                  <p className="border-l border-destructive/20 pl-4 text-sm italic leading-relaxed text-destructive/80">
                    &ldquo;Our ops, mobilization, and finance teams are spending more time managing our tools than we are supporting our missionaries.&rdquo;
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-7 lg:gap-8">
                {PROBLEM_OPTIONS.map((option) => (
                  <FalseChoicePanel key={option.id} option={option} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="portal-walkthrough"
        className="relative overflow-hidden border-b border-border bg-background py-24"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(var(--foreground) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mx-auto mb-24 max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2">
                <Layers size={14} className="text-success" />
                <span className="font-mono text-xs uppercase tracking-widest text-success">
                  Mission Control
                </span>
              </div>
              <h2 className="mb-8 text-5xl font-bold leading-[0.9] tracking-tighter text-foreground md:text-7xl">
                One place for the work that keeps getting split apart.
              </h2>
              <div className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-foreground/40 to-transparent" />
              <p className="mb-8 text-xl font-light leading-relaxed text-balance text-muted-foreground md:text-2xl">
                Mission Control gives staff one operating surface instead of a pile of disconnected screens and handoffs.
              </p>
              <p className="mx-auto max-w-2xl leading-relaxed text-balance text-muted-foreground/80">
                Keep donor care, missionary support, statements, reporting, and operations inside the same mission-built system.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="mx-auto mb-10 max-w-6xl">
              <PlatformTabs items={[...PLATFORM_TABS]} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border bg-background py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
          <DitherGlobe scale={1.2} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <Reveal>
              <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                The product surfaces teams actually keep needing.
              </h2>
              <p className="text-xl font-light leading-relaxed text-balance text-muted-foreground">
                Donor self-service, missionary visibility, and finance/reporting should not feel like disconnected add-ons.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {SURFACE_CARDS.map((item, index) => (
              <Reveal key={item.title} delay={index * 100} className="h-full">
                <SurfacePanel item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Reveal>
              <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Ownership and trust belong inside the product story.
              </h2>
              <p className="text-xl font-light leading-relaxed text-balance text-muted-foreground">
                Mission operations software is easier to trust when ownership, permissions, and stewardship are visible from the start.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {TRUST_POINTS.map((item, index) => (
              <Reveal key={item.title} delay={index * 100} className="h-full">
                <SurfacePanel item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border bg-background py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="page-shell-glow surface-interactive border-foreground/10 bg-primary text-primary-foreground rounded-[2rem] border px-8 py-10 shadow-[0_32px_82px_-56px_rgba(22,33,43,0.82)]">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
                <div>
                  <p className="text-primary-foreground/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                    Optional managed support
                  </p>
                  <h2 className="font-heading mt-4 max-w-[14ch] text-[clamp(2.3rem,4vw,3.7rem)] leading-[0.98] font-semibold tracking-[-0.06em]">
                    Need more lift than software alone?
                  </h2>
                  <p className="text-primary-foreground/82 mt-5 max-w-[58ch] text-base leading-7">
                    Asym can add a managed donor care and ops layer for teams that want help handling routine donor questions, expense follow-through, and simple reconciliation prep.
                  </p>
                </div>
                <div className="flex items-start lg:justify-end">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-white/12"
                  >
                    Talk with us about managed support
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-card py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <div className="mb-6 flex items-center gap-2 text-primary">
                <Heart size={16} />
                <span className="font-mono text-xs uppercase tracking-widest">
                  Waitlist and rollout
                </span>
              </div>
              <h2 className="mb-8 text-5xl font-bold leading-[0.9] tracking-tighter text-foreground md:text-6xl">
                Join the waitlist.
              </h2>
              <p className="mb-12 max-w-md border-l border-border pl-6 text-balance text-lg leading-relaxed text-muted-foreground">
                Start with early access updates, product walkthrough invitations, and rollout conversations for qualified organizations. Managed Donor Care + Ops can be discussed if your team needs more lift than software alone.
              </p>
              <ul className="space-y-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <li className="group flex items-center gap-4">
                  <div className="rounded-full border border-border p-1 transition-colors group-hover:border-primary/50">
                    <div className="h-1.5 w-1.5 rounded-full bg-foreground transition-colors group-hover:bg-primary" />
                  </div>
                  Early access updates
                </li>
                <li className="group flex items-center gap-4">
                  <div className="rounded-full border border-border p-1 transition-colors group-hover:border-primary/50">
                    <div className="h-1.5 w-1.5 rounded-full bg-foreground transition-colors group-hover:bg-primary" />
                  </div>
                  Product walkthrough invitations
                </li>
                <li className="group flex items-center gap-4">
                  <div className="rounded-full border border-border p-1 transition-colors group-hover:border-primary/50">
                    <div className="h-1.5 w-1.5 rounded-full bg-foreground transition-colors group-hover:bg-primary" />
                  </div>
                  Qualified rollout conversations
                </li>
                <li className="group flex items-center gap-4">
                  <div className="rounded-full border border-border p-1 transition-colors group-hover:border-primary/50">
                    <div className="h-1.5 w-1.5 rounded-full bg-foreground transition-colors group-hover:bg-primary" />
                  </div>
                  Optional managed-support interest
                </li>
              </ul>
            </Reveal>
            <Reveal delay={200}>
              <DeploymentForm />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

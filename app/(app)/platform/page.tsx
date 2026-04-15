import { InquiryForm } from "@/components/site/inquiry-form";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Database,
  Globe,
  Zap,
  Mail,
  FileText,
  PenTool,
  BarChart,
  Heart,
  Calendar,
  PlusCircle,
  ArrowRight,
  Layers,
  ShieldAlert,
  type LucideIcon,
  Server,
  MessageCircle,
  Target,
  DollarSign,
} from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/reveal";
import { memo, type ReactNode } from "react";

// ============================================================================
// Types
// ============================================================================

interface MissionTile {
  readonly title: string;
  readonly desc: ReactNode;
  readonly icon: LucideIcon;
  readonly meta: string;
  readonly highlight?: boolean;
  readonly className?: string;
}

interface FocusPoint {
  readonly title: string;
  readonly icon: LucideIcon;
  readonly desc: string;
}

interface ProblemOption {
  readonly id: string;
  readonly title: string;
  readonly icon: LucideIcon;
  readonly subtitle: string;
  readonly desc: string;
  readonly points: readonly string[];
}

// ============================================================================
// Static Data
// ============================================================================

const MISSION_CONTROL_TILES: readonly MissionTile[] = [
  {
    title: "Specialized CRM",
    desc: (
      <>
        Powered by a custom Missions Built{" "}
        <a
          href="https://github.com/twentyhq/twenty"
          target="_blank"
          rel="noreferrer"
          className="text-foreground hover:text-primary underline decoration-border transition-colors"
        >
          Twenty CRM
        </a>
        , the open‑source standard with 40k GitHub Stars. The definitive source of
        truth for people, churches, and pledges. A living record that updates in
        real‑time, managed with a modern interface designed for speed. A CRM your
        Advancement team will actually enjoy using.
      </>
    ),
    icon: Database,
    meta: "// CORE RECORD",
  },
  {
    title: "Contributions Hub",
    desc: "Live transaction feed. Automate reconciliation and eliminate manual entry. Reversals and management in one place, all perfectly integrated with Stripe for the best‑in‑class payment processing experience.",
    icon: DollarSign,
    meta: "// FINANCE",
  },
  {
    title: "Web Studio",
    desc: (
      <>
        The power of{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          rel="noreferrer"
          className="text-foreground hover:text-primary underline decoration-border transition-colors"
        >
          Next.js
        </a>{" "}
        with the ease of a visual CMS (a headless Payload CMS). Whether you have a
        frontend team or just need to update the blog, you are in control. No more
        change orders for simple button tweaks. Build on open standards, not
        proprietary cages.
      </>
    ),
    icon: Globe,
    meta: "// CMS",
  },
  {
    title: "Email Studio",
    desc: "Every email that comes from your organization needs to represent the work you're doing. No more compromises on what comes from your organization whether it be an appeal campaign, emailed donation receipt, or a simple password‑reset email. It all needs to be fully branded and owned by you.",
    icon: Mail,
    meta: "// COMMS",
  },
  {
    title: "Donor Support Hub",
    desc: (
      <>
        Donor care is vital to any missions organization. Integrated{" "}
        <a
          href="https://github.com/chatwoot/chatwoot"
          target="_blank"
          rel="noreferrer"
          className="text-foreground hover:text-primary underline decoration-border transition-colors"
        >
          Chatwoot CE
        </a>{" "}
        to handle all donor issues with easy tracking to make sure no donor
        question gets dropped or missed. All integrated into your Mission Control
        Panel.
      </>
    ),
    icon: MessageCircle,
    meta: "// SUPPORT",
  },
  {
    title: "Statements Studio",
    desc: "Generate receipt packs and year‑end tax documents automatically. The easy way to create and manage templates for your printable statements or reports. You can make it exactly how you want it with no compromises or hours of endless coding just to get the header or footer right.",
    icon: FileText,
    meta: "// COMPLIANCE",
  },
  {
    title: "Sign Studio",
    desc: (
      <>
        No need for DocuSign anymore. Powered by{" "}
        <a
          href="https://github.com/documenso/documenso"
          target="_blank"
          rel="noreferrer"
          className="text-foreground hover:text-primary underline decoration-border transition-colors"
        >
          Documenso CE
        </a>
        , fully integrated in your mobilization and onboarding workflow. One
        integrated place to handle agreements, waivers, and packets.
      </>
    ),
    icon: PenTool,
    meta: "// LEGAL",
  },
  {
    title: "Start‑to‑Finish Mobilization",
    desc: "Accelerate your deployment with effortless management. You set up the workflow and process you want with best‑in‑class automation that is fully visualized instead of endless and confusing logic trees. Move candidates from interest to field with clear steps.",
    icon: ArrowRight,
    meta: "// HR FLOW",
  },
  {
    title: "Report Studio",
    desc: "Pull or schedule reports for leadership, finance, etc in a few simple steps. One beautiful, easy‑to‑use interface that just gives you the reports you need, when you need them, with real‑time visibility.",
    icon: BarChart,
    meta: "// INTELLIGENCE",
  },
  {
    title: "Simplified Automations",
    desc: "You are fully in charge to automatically trigger actions based on donations, new applications, and more with Zapier's 8,000+ app integrations.",
    icon: Zap,
    meta: "// LOGIC",
  },
  {
    title: "Member Care",
    desc: "One dashboard for your MC team to track care, plans, and milestones. Support your workers with intentional care and equip your team with the resources they need for effective care plans.",
    icon: Heart,
    meta: "// RETENTION",
  },
  {
    title: "Events & Gatherings",
    desc: "Handle events on your own website, fully branded and under your control. One source of truth for centralized registration and logistics. Connect attendees to your CRM instantly without re‑entering data.",
    icon: Calendar,
    meta: "// LOGISTICS",
  },
  {
    title: "Roadmap Active",
    desc: "The OS is alive. We are continuously deploying new modules to serve the field.",
    icon: PlusCircle,
    meta: "// FUTURE",
    highlight: true,
    className: "md:col-span-2 lg:col-span-3",
  },
];

const WHY_FOCUS_DATA: readonly FocusPoint[] = [
  {
    title: "Sending is not Selling",
    icon: Target,
    desc: "Generic CRMs are built for sales pipelines. They don't understand deputation, support raising, or the delicate nature of donor relationships. We build for partnership, not transactions.",
  },
  {
    title: "The Fragmentation Tax",
    icon: Layers,
    desc: "When you stitch together 15 different SaaS tools, you pay a 'tax' in lost data, broken syncs, and staff burnout. Missions agencies lose millions of dollars annually to this inefficiency.",
  },
  {
    title: "Control Matters",
    icon: ShieldAlert,
    desc: "True ownership means you aren't beholden to a vendor's roadmap or pricing. We build architecture where you own the data, the keys, and the code, ensuring you are never locked into a system you can't control.",
  },
];

const PROBLEM_OPTIONS: readonly ProblemOption[] = [
  {
    id: "diy",
    title: "OPTION A: THE DIY TRAP",
    icon: Layers,
    subtitle: "The Generic Stack",
    desc: "Stitching together Salesforce, Mailchimp, QuickBooks, spreadsheets, and standalone website builders.",
    points: ["DATA SILOS", "BROKEN AUTOMATION LINKS", "HIGH SUBSCRIPTION FEES"],
  },
  {
    id: "legacy",
    title: "OPTION B: Legacy Vendors",
    icon: Globe,
    subtitle: "Outdated tech",
    desc: "Proprietary software built in the early 2000s. Safe, but stagnant and difficult to modernize.",
    points: ["VENDOR LOCK-IN", "CLUNKY UX", "SLOW ROADMAPS"],
  },
];

// ============================================================================
// Sub‑Components (visual parity with legacy)
// ============================================================================

// Simple DitherGrid / DitherGlobe replacements (CSS only, to avoid import issues)
const DitherGrid = () => (
  <div
    className="fixed inset-0 z-0 pointer-events-none opacity-10"
    style={{
      backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}
  />
);

const DitherGlobe = ({ scale = 1.2, className = "" }) => (
  <div
    className={cn("pointer-events-none select-none opacity-20 mix-blend-screen", className)}
    style={{
      transform: `scale(${scale})`,
      background: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0) 70%)",
      width: "min(80vw, 80vh)",
      height: "min(80vw, 80vh)",
      borderRadius: "50%",
      filter: "blur(60px)",
    }}
  />
);

// ScrambleText alternative (simple typing effect – we skip the full animation but keep the look)
const ScrambleText = ({ text }: { text: string }) => <span className="tracking-wider">{text}</span>;

// SpotlightCard effect using Tailwind
const SpotlightCard = memo(({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-sm transition-all duration-300 hover:shadow-lg group",
      className
    )}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    {children}
  </div>
));
SpotlightCard.displayName = "SpotlightCard";

const MissionCard = memo(({ tile }: { tile: MissionTile }) => (
  <div
    className={cn(
      "group relative h-full flex flex-col justify-between bg-card border rounded-sm overflow-hidden transition-all duration-300",
      tile.highlight
        ? "border-primary/40 shadow-[0_0_0_1px_rgba(16,185,129,0.1)]"
        : "border-border hover:border-foreground/20"
    )}
  >
    {/* Header */}
    <div className="p-8 flex justify-between items-start border-b border-border bg-card">
      <div
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-sm border transition-colors",
          tile.highlight
            ? "bg-primary/10 border-primary/20 text-primary"
            : "bg-secondary border-border text-muted-foreground group-hover:text-foreground group-hover:border-foreground/30"
        )}
      >
        <tile.icon size={20} strokeWidth={1.5} />
      </div>
      <span
        className={cn(
          "font-mono text-[9px] uppercase tracking-widest mt-2",
          tile.highlight
            ? "text-emerald-600 dark:text-primary"
            : "text-muted-foreground group-hover:text-foreground/60 transition-colors"
        )}
      >
        {tile.meta}
      </span>
    </div>

    {/* Content */}
    <div className="p-8 flex-grow relative bg-card">
      <div className="relative z-10">
        <h3
          className={cn(
            "text-xl font-display font-bold mb-4 tracking-tight transition-colors",
            tile.highlight ? "text-foreground" : "text-foreground group-hover:text-primary"
          )}
        >
          {tile.title}
        </h3>
        <div className="text-sm text-muted-foreground leading-relaxed font-light text-balance">
          {tile.desc}
        </div>
      </div>
    </div>

    {/* Status Bar */}
    <div
      className={cn(
        "px-8 py-4 border-t flex items-center gap-3",
        tile.highlight ? "bg-primary/5 border-primary/20" : "bg-background border-border"
      )}
    >
      <div className="relative flex h-1.5 w-1.5">
        <span
          className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            tile.highlight ? "bg-primary" : "bg-success"
          )}
        />
        <span
          className={cn(
            "relative inline-flex rounded-full h-1.5 w-1.5",
            tile.highlight ? "bg-primary" : "bg-success"
          )}
        />
      </div>
      <span
        className={cn(
          "font-mono text-[9px] uppercase tracking-widest",
          tile.highlight ? "text-emerald-600 dark:text-primary" : "text-muted-foreground"
        )}
      >
        {tile.highlight ? "Continuous Deployment" : "System Active"}
      </span>
    </div>
  </div>
));
MissionCard.displayName = "MissionCard";

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
        "bg-card h-full border border-border transition-colors duration-500 group relative overflow-hidden flex flex-col rounded-sm",
        borderColor
      )}
    >
      {/* Corner markers */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-border"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-current" />
        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-current" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-current" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-current" />
      </div>

      <div className="relative z-10 flex flex-col h-full p-8 md:p-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div
            className={cn(
              "p-3 rounded-sm border bg-secondary border-border transition-colors",
              iconColor
            )}
          >
            <option.icon size={24} strokeWidth={1.5} />
          </div>
          <span className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-secondary px-3 py-1.5 rounded-sm border border-border">
            {option.title.split(":")[0]}
          </span>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h3 className="text-2xl font-display font-bold text-foreground mb-4 tracking-tight group-hover:text-foreground/90 transition-colors">
            {option.title.split(":")[1]?.trim()}
          </h3>
          <div className={cn("flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest mb-6", subtitleColor)}>
            <div className={cn("h-px w-6", lineColor)} />
            {option.subtitle}
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed border-l border-border pl-6 text-balance">
            {option.desc}
          </p>
        </div>

        {/* Footer List */}
        <div className="mt-auto pt-8 border-t border-border">
          <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-4">
            Critical Failures
          </div>
          <ul className="space-y-4">
            {option.points.map((point, i) => (
              <li key={i} className="text-[11px] font-mono text-muted-foreground flex items-center gap-3 group/list">
                <div className="w-1 h-1 bg-destructive rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <span className="group-hover/list:text-foreground transition-colors tracking-wider">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});
FalseChoicePanel.displayName = "FalseChoicePanel";

const FocusCard = memo(({ item }: { item: FocusPoint }) => (
  <SpotlightCard className="h-full bg-card flex flex-col justify-between group rounded-sm border-border hover:border-foreground/20">
    <div className="p-8 md:p-10 h-full flex flex-col">
      <div className="mb-8 p-3 bg-secondary w-fit rounded-sm border border-border text-foreground group-hover:text-primary transition-colors">
        <item.icon size={24} strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl font-display font-bold text-foreground mb-4 tracking-tight">{item.title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm text-balance border-l border-border pl-6 mt-auto">
        {item.desc}
      </p>
    </div>
  </SpotlightCard>
));
FocusCard.displayName = "FocusCard";

function DeploymentForm() {
  return <InquiryForm kind="waitlist" />;
}

// ============================================================================
// Main Page Component
// ============================================================================

export const metadata: Metadata = createMetadata({
  title: "Platform",
  description:
    "See how Asymmetric.al replaces the fragmented DIY stack with a coherent mission operating system built for sending agencies.",
  path: "/platform",
});

export default function PlatformPage() {
  return (
    <main id="main-content" tabIndex={-1} className="pt-24 min-h-screen bg-background text-foreground overflow-hidden selection:bg-foreground selection:text-background">
      {/* Global backgrounds */}
      <DitherGrid />
      <div className="fixed right-0 top-1/2 -translate-y-1/2 translate-x-1/3 pointer-events-none hidden lg:block z-0">
        <DitherGlobe scale={1.6} />
      </div>

      {/* ========== HERO SECTION ========== */}
      <section className="relative border-b border-border pb-12 md:pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border bg-secondary/50 rounded-full text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-8 backdrop-blur-md">
                <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                <ScrambleText text="MISSION OPERATING SYSTEM" />
              </div>

              <h1 className="text-6xl md:text-8xl font-display font-bold text-foreground mb-8 tracking-tighter leading-[0.9]">
                One Platform.<br />
                <span className="text-muted-foreground">Total Clarity.</span>
              </h1>

              <div className="pl-6 border-l-2 border-border mb-12">
                <p className="text-xl text-muted-foreground max-w-2xl font-light leading-relaxed text-balance">
                  Most agencies are running on a patchwork of disconnected tools. Data is siloed. Staff are exhausted. The mission slows down.
                </p>
                <p className="text-lg text-muted-foreground/80 max-w-2xl font-light leading-relaxed text-balance mt-4">
                  Asymmetric.al replaces the chaos of the &quot;DIY stack&quot; with a single, unified operating system designed specifically for the complexities of sending Organizations.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/specs" className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background rounded-sm font-medium hover:bg-primary transition-colors">
                  System Architecture
                </Link>
                <Link href="#mission-control" className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-sm font-medium hover:bg-secondary transition-colors">
                  Role Views
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== FALSE CHOICE SECTION ========== */}
      <section className="bg-card border-b border-border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-stretch">
              <div className="lg:col-span-5 flex flex-col justify-center">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
                  Agencies today face limited options.
                </h2>
                <div className="p-8 border border-destructive/20 bg-destructive/5 rounded-sm">
                  <p className="text-destructive/80 text-sm leading-relaxed italic border-l border-destructive/20 pl-4">
                    &ldquo;Our ops, mobilization, and finance teams are spending more time managing our tools than we are supporting our missionaries.&rdquo; — Common Agency Feedback
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {PROBLEM_OPTIONS.map((option) => (
                  <FalseChoicePanel key={option.id} option={option} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== WHY FOCUS SECTION ========== */}
      <section className="bg-background border-b border-border py-24 relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          <DitherGlobe scale={1.2} />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight">
                You need an option built strategically for missions.
              </h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed text-balance">
                We aren&apos;t trying to build software for everyone. We are hyper‑focused on the unique complexities of sending agencies.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {WHY_FOCUS_DATA.map((item, i) => (
              <Reveal key={i} delay={i * 100} className="h-full">
                <FocusCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MISSION CONTROL SECTION ========== */}
      <section id="mission-control" className="bg-background border-b border-border py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(var(--foreground) 1px, transparent 1px)", backgroundSize: "30px 30px" }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="text-center max-w-4xl mx-auto mb-24">
              <div className="inline-flex items-center gap-2 mb-6">
                <Server size={14} className="text-success" />
                <span className="font-mono text-xs text-success uppercase tracking-widest">The Unified Solution</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-8 tracking-tighter leading-[0.9]">
                Mission Control
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-foreground/40 to-transparent mx-auto mb-8" />
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed text-balance mb-8">
                Replace the clutter with clarity. Every operational function under one login, sharing one database.
              </p>
              <p className="text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed text-balance">
                Eliminate the hassle of disjointed and disconnected platforms. Stop zapping data between five different SaaS tools.
                Just one unified operating system designed to run the work of the Great Commission.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MISSION_CONTROL_TILES.map((tile, i) => (
              <Reveal key={i} delay={i * 50} className={cn("h-full", tile.className)}>
                <MissionCard tile={tile} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PARTNERSHIP / DEPLOYMENT SECTION ========== */}
      <section className="bg-card py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal>
              <div className="flex items-center gap-2 mb-6 text-primary">
                <Heart size={16} />
                <span className="font-mono text-xs uppercase tracking-widest">Partnership Model</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-8 tracking-tighter leading-[0.9]">
                Let&apos;s build<br />the future.
              </h2>
              <p className="text-muted-foreground mb-12 leading-relaxed max-w-md text-balance text-lg border-l border-border pl-6">
                We are looking for agencies who are tired of the status quo. If you are ready to modernize your operations and steward your data, we want to talk.
              </p>
              <ul className="space-y-6 font-mono text-xs text-muted-foreground uppercase tracking-widest">
                <li className="flex items-center gap-4 group">
                  <div className="p-1 border border-border rounded-full group-hover:border-primary/50 transition-colors">
                    <div className="w-1.5 h-1.5 bg-foreground rounded-full group-hover:bg-primary transition-colors" />
                  </div>
                  Early Access Program
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="p-1 border border-border rounded-full group-hover:border-primary/50 transition-colors">
                    <div className="w-1.5 h-1.5 bg-foreground rounded-full group-hover:bg-primary transition-colors" />
                  </div>
                  Data Migration Support
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="p-1 border border-border rounded-full group-hover:border-primary/50 transition-colors">
                    <div className="w-1.5 h-1.5 bg-foreground rounded-full group-hover:bg-primary transition-colors" />
                  </div>
                  Open Source Contribution
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

import Link from "next/link";
import { Container } from "@/components/site/container";
import { Pipeline } from "@/components/site/reactbits/pipeline";
import type { PipelineNode } from "@/components/site/reactbits/pipeline";

const pillars = [
  {
    title: "Thank-yous and updates from real gifts",
    body: "Prepare warm acknowledgments and partner updates directly from completed gifts, fund designations, and opted-in supporter history, ready for staff or missionaries to review, edit, and send.",
  },
  {
    title: "Faster answers to everyday donor questions",
    body: "Draft accurate replies to common questions about missing receipts, year-end statements, and expiring cards, guiding supporters straight to self-service without digging across tools.",
  },
  {
    title: "Privacy rules enforced underneath every draft",
    body: "Every AI helper only sees what the signed-in person is allowed to see, shows which real records informed the draft, and follows public rules anyone on your team can inspect.",
  },
] as const;

const DRAFT_NODE_ID = "thank-you-draft";

const VISION_PIPELINE_NODES: readonly PipelineNode[] = [
  {
    id: "gift-arrives",
    title: "Gift arrives",
    description: "Online or check",
    status: "Matched to fund",
    icon: "gift",
  },
  {
    id: "privacy-checked",
    title: "Privacy checked",
    description: "Donor choices",
    status: "Choices honored",
    icon: "shield",
  },
  {
    id: DRAFT_NODE_ID,
    title: "Thank-you draft",
    description: "From this gift",
    status: "Ready to edit",
    icon: "sparkles",
  },
  {
    id: "you-send-it",
    title: "You send it",
    description: "In your voice",
    status: "Approved by you",
    icon: "send",
    tone: "human",
  },
  {
    id: "care-logged",
    title: "Care logged",
    description: "Partner note",
    status: "Follow-up saved",
    icon: "users",
  },
];

const VISION_PIPELINE_EDGES: readonly (readonly [string, string])[] = [
  ["gift-arrives", DRAFT_NODE_ID],
  ["privacy-checked", DRAFT_NODE_ID],
  [DRAFT_NODE_ID, "you-send-it"],
  [DRAFT_NODE_ID, "care-logged"],
];

export const VisionSection = () => (
  <section
    id="vision"
    aria-labelledby="vision-title"
    className="vision-band text-night-foreground border-night-rule scroll-mt-16 border-y py-16 sm:py-20 lg:py-24"
  >
    <Container>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:items-center lg:gap-12">
        <div className="min-w-0">
          <p className="border-night-rule text-night-muted inline-flex items-center gap-2 rounded-full border border-dashed px-3.5 py-1 font-mono text-xs font-medium">
            <span
              aria-hidden="true"
              className="border-night-accent size-2 rounded-full border border-dashed"
            />
            Vision · Grounded AI
          </p>
          <h2
            id="vision-title"
            className="font-heading text-night-foreground mt-4 text-[clamp(2rem,3.8vw,3.15rem)] leading-[1.04] font-semibold tracking-[-0.03em] text-balance"
          >
            AI that works from your ground truth.
          </h2>
          <p className="text-night-muted mt-4 max-w-[38rem] text-base leading-7 text-pretty sm:text-[1.09375rem] sm:leading-8">
            When your gifts, funds, missionary micro-CRMs, and donor preferences
            live in one place, practical AI can take routine office and
            follow-up work off your team’s shoulders without guessing or
            crossing privacy boundaries.
          </p>
        </div>

        <figure className="min-w-0">
          <Pipeline
            nodes={VISION_PIPELINE_NODES}
            edges={VISION_PIPELINE_EDGES}
            nodeWidth={192}
          />
          <figcaption className="text-night-muted mt-3.5 flex items-start gap-2 font-sans text-xs leading-5">
            <span
              aria-hidden="true"
              className="border-night-accent mt-[0.35rem] size-2 shrink-0 rounded-full border border-dashed"
            />
            <span>
              Planned workflow (in development): when a gift arrives,{" "}
              <span translate="no">asym</span> will check the donor’s privacy
              choices, draft a personal thank-you for your missionary or office
              staff to edit and send, and save the follow-up note.
            </span>
          </figcaption>
        </figure>
      </div>

      <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
        {pillars.map((item) => (
          <li
            key={item.title}
            className="border-night-rule min-w-0 border-t pt-5"
          >
            <h3 className="font-heading text-night-foreground text-lg font-semibold tracking-[-0.02em]">
              {item.title}
            </h3>
            <p className="text-night-muted mt-2 text-sm leading-6 text-pretty sm:text-[0.9375rem] sm:leading-7">
              {item.body}
            </p>
          </li>
        ))}
      </ol>

      <p className="text-night-muted mt-8 text-xs leading-6 sm:text-sm">
        AI drafts; people send. Automated tools never move money, alter gift
        records, or message supporters without review. Follow progress in{" "}
        <Link
          href="/#where-things-stand"
          prefetch={false}
          className="text-night-foreground focus-visible:ring-ring focus-visible:ring-offset-night rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-night-accent"
        >
          Core’s public roadmap
        </Link>
        .
      </p>
    </Container>
  </section>
);

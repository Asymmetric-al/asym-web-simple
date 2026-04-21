import { PageHero, Section } from "@/components/site/page";
import { Reveal } from "@/components/site/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

const faqItems = [
  {
    value: "what-is-asym",
    question: "What is Asym?",
    answer:
      "Asym is the operating system for Christian missions. It gives mission teams one mission-built system for donor care, missionary support, statements, reporting, and operations.",
  },
  {
    value: "replace-at-once",
    question: "Do we need to replace everything at once?",
    answer:
      "No. The system can be adopted in a calm sequence, starting with the flows that create relief fastest.",
  },
  {
    value: "donor-self-serve",
    question: "Can donors manage recurring gifts and receipts on their own?",
    answer:
      "Yes. Donors can access giving history, receipts, recurring gift updates, payment methods, and statements through the donor experience.",
  },
  {
    value: "missionary-dashboard",
    question: "What can missionaries actually see and do from their dashboard?",
    answer:
      "Missionaries can see support progress, new donors, at-risk recurring, tasks, and next actions without waiting on staff to stitch the answer together.",
  },
  {
    value: "finance-reporting",
    question: "How do statements, reporting, and finance fit into the system?",
    answer:
      "Asym supports branded statements, reporting, and cleaner reconciliation handoff so finance can move with more confidence.",
  },
  {
    value: "ownership",
    question: "Who owns the data, keys, branding, and domains?",
    answer:
      "Your organization does. Ownership and trust are part of the product story, not an afterthought.",
  },
  {
    value: "open-source",
    question: "Is Asym open source?",
    answer:
      "Asym is built on open-source foundations. That strengthens transparency and stewardship. Most teams simply use the product as a supported system. If your team wants to extend or contribute, you can.",
  },
  {
    value: "managed",
    question: "Do you offer a managed-service option?",
    answer:
      "Yes. For organizations that want more help, Asym can add a managed donor care and ops layer that handles routine donor questions, expense follow-through, and simple reconciliation prep inside the same system.",
  },
  {
    value: "waitlist",
    question: "Why is the site waitlist-first?",
    answer:
      "The product is still being rolled out carefully. The waitlist helps route early access updates, walkthrough invitations, and qualified rollout conversations without pretending every organization should onboard the same way on day one.",
  },
  {
    value: "portal",
    question: "Can we see the donor and missionary portal walkthrough?",
    answer:
      "Yes. The platform page includes the donor and missionary portal walkthrough section so teams can see how the role-aware surfaces fit together before joining the waitlist.",
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Asym FAQ for Christian Missions Software",
  description:
    "Frequently asked questions about Asym, including rollout, donor self-service, missionary dashboards, finance, trust, open-source foundations, and managed support.",
  path: "/faq",
});

export default function FAQPage() {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <PageHero
        eyebrow="FAQ"
        title={
          <h1 className="font-heading text-foreground text-[clamp(3rem,6vw,5rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
            Clear answers for mission teams evaluating Asym.
          </h1>
        }
        description="These answers cover the main public questions about Asym: what the product is, how the waitlist works, how donor care and missionary support fit together, and why faith and open-source foundations stay visible."
        actions={[
          { label: "Join the Waitlist", href: "/waitlist" },
          {
            label: "See the Donor and Missionary Portal Walkthrough",
            href: "/platform#portal-walkthrough",
            variant: "outline",
          },
        ]}
        meta={[
          "Trust and transparency",
          "Open-source foundations",
          "Managed support stays secondary",
          "Christian faith visible",
        ]}
      >
        <Reveal trigger="mount">
          <Card className="page-shell-glow surface-interactive border-foreground/10 bg-primary text-primary-foreground rounded-[2rem] border shadow-[0_32px_82px_-56px_rgba(22,33,43,0.82)]">
            <CardHeader>
              <p className="text-primary-foreground/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                Quick links
              </p>
              <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                Start with the question you actually have.
              </CardTitle>
            </CardHeader>
            <CardContent className="text-primary-foreground/82 flex flex-col gap-3 text-sm leading-7">
              <p>
                Product walkthrough:{" "}
                <Link href="/platform#portal-walkthrough" className="underline underline-offset-4">
                  Platform walkthrough
                </Link>
              </p>
              <p>
                Faith and doctrine:{" "}
                <Link href="/statement-of-faith" className="underline underline-offset-4">
                  Statement of Faith
                </Link>
              </p>
              <p>
                Financials:{" "}
                <Link href="/501c3" className="underline underline-offset-4">
                  Global Fellowship Inc. covering
                </Link>
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </PageHero>

      <Section className="section-divider-accent">
        <div className="mx-auto max-w-4xl">
          <Accordion
            defaultValue={["what-is-asym"]}
            className="surface-panel surface-interactive border-foreground/10 rounded-[2rem]"
          >
            {faqItems.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger className="px-5 py-5 text-base font-semibold sm:px-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-5 text-sm leading-7 text-muted-foreground sm:px-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <Section tone="sky">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Waitlist",
              href: "/waitlist",
              description:
                "Join the waitlist for early access updates, walkthrough invitations, and rollout conversations.",
            },
            {
              title: "Open Source and Trust",
              href: "/open-source-and-trust",
              description:
                "See how open-source foundations, stewardship, and long-term trust fit together in the public message.",
            },
            {
              title: "Contact",
              href: "/contact",
              description:
                "Reach out directly if you want the Mission Tech Stack Audit or have a general question for the team.",
            },
          ].map((item) => (
            <Card key={item.href} className="surface-card surface-interactive rounded-[1.8rem]">
              <CardHeader>
                <CardTitle className="font-heading text-xl font-semibold tracking-[-0.04em]">
                  <Link href={item.href} className="link-resilient">
                    {item.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm leading-7">
                {item.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}

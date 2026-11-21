import Link from "next/link";
import { Container } from "@/components/site/container";
import { AsymmetricAiField } from "@/components/site/home/asymmetric-field";

const pillars = [
  {
    title: "Campaigns grounded in real context",
    body: "Turn a field need or year-end goal into an editable appeal, giving page, and supporter list built from your actual funds and giving history.",
  },
  {
    title: "Less routine donor-care overhead",
    body: "Clear out repetitive inbox requests, follow-ups, and record cleanup so your team spends its energy on real relationships.",
  },
  {
    title: "Built on one open foundation",
    body: "Because the core is open source under AGPL-3.0-only, AI runs on one trusted record you can inspect and own, with your team editing before anything goes out.",
  },
] as const;

export const VisionSection = () => (
  <section
    id="vision"
    aria-labelledby="vision-title"
    className="vision-band text-night-foreground border-night-rule scroll-mt-16 border-y py-16 sm:py-20 lg:py-24"
  >
    <Container>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,54fr)_minmax(0,46fr)] lg:items-center lg:gap-14">
        <div className="min-w-0">
          <p className="border-night-rule text-night-muted inline-flex items-center gap-2 rounded-full border border-dashed px-3 py-1 font-sans text-xs font-medium">
            <span
              aria-hidden="true"
              className="border-night-accent size-2 rounded-full border border-dashed"
            />
            Vision · AI in development
          </p>
          <h2
            id="vision-title"
            className="font-heading text-night-foreground mt-4 text-[clamp(2rem,3.8vw,3.15rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance"
          >
            Practical AI, built for real work.
          </h2>
          <p className="text-night-muted mt-4 max-w-[38rem] text-base leading-7 text-pretty sm:text-[1.09375rem] sm:leading-8">
            Nonprofits of every size spend too many hours chasing receipts,
            reconciling supporter records, and starting every campaign from a
            blank page. We’re building AI directly onto the shared giving core
            so it understands your funds, history, and supporters: helping draft
            appeals, lighten routine donor care, and clear out repetitive admin.
          </p>
        </div>

        <div className="min-w-0">
          <AsymmetricAiField />
        </div>
      </div>

      <dl className="border-night-rule mt-12 grid gap-8 border-t pt-10 md:grid-cols-3 md:gap-10">
        {pillars.map((item) => (
          <div key={item.title} className="min-w-0">
            <dt className="font-heading text-night-foreground text-lg font-semibold tracking-[-0.02em]">
              {item.title}
            </dt>
            <dd className="text-night-muted mt-2 text-sm leading-6 text-pretty sm:text-[0.9375rem] sm:leading-7">
              {item.body}
            </dd>
          </div>
        ))}
      </dl>

      <p className="text-night-muted mt-8 text-xs leading-6 sm:text-sm">
        AI campaign drafting and donor-care assistance are in development and
        not shipped yet. See{" "}
        <Link
          href="/#where-things-stand"
          prefetch={false}
          className="text-night-foreground focus-visible:ring-ring focus-visible:ring-offset-night rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-night-accent"
        >
          where things stand
        </Link>{" "}
        for what is built in public code today versus planned.
      </p>
    </Container>
  </section>
);

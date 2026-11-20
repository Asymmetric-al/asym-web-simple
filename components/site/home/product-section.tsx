import Link from "next/link";
import { Container } from "@/components/site/container";
import { ApprovalBench } from "@/components/site/home/approval-bench";
import { SectionTitle } from "@/components/site/home/section-heading";
import { cn } from "@/lib/utils";

const campaignStages = [
  {
    step: "01",
    actor: "Your team",
    title: "Describe the appeal",
    detail: "Set the goal, fund, and field project.",
    isDraft: false,
  },
  {
    step: "02",
    actor: "AI draft",
    title: "Prepare page, email & audience",
    detail: "Drafted strictly within your staff permissions.",
    isDraft: true,
  },
  {
    step: "03",
    actor: "Your team",
    title: "Edit & approve before sending",
    detail: "Nothing emails a donor or changes your site without sign-off.",
    isDraft: false,
  },
  {
    step: "04",
    actor: "asym",
    title: "Publish & tie gifts to history",
    detail: "Every resulting gift and receipt lands on the same record.",
    isDraft: true,
  },
] as const;

export const ProductSection = () => (
  <section
    id="product"
    aria-labelledby="product-title"
    className="pb-[clamp(3.5rem,6vw,5.5rem)]"
  >
    <Container>
      <div className="border-rule border-t pt-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <p className="text-draft inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.02em]">
              <span
                aria-hidden="true"
                className="border-draft inline-block w-4 border-t-[1.5px] border-dashed"
              />
              In development · Built on the shared record
            </p>
            <SectionTitle id="product-title">
              Before an appeal goes out.
            </SectionTitle>
            <p className="text-muted-foreground mt-4 max-w-[34rem] text-base leading-7 text-pretty sm:text-[1.0625rem] sm:leading-8">
              When a field project needs year&#8209;end support, your team
              shouldn’t rebuild pages, donor lists, and thank&#8209;you emails
              by hand. We’re building AI drafting that works inside your
              existing permissions and stops for a person’s stamp.
            </p>

            <ol className="border-rule divide-rule mt-7 divide-y border-y">
              {campaignStages.map((stage) => (
                <li
                  key={stage.step}
                  className="grid grid-cols-[2.25rem_1fr] items-baseline gap-3 py-3.5"
                >
                  <span
                    className={cn(
                      "font-mono text-xs tabular-nums",
                      stage.isDraft
                        ? "text-draft"
                        : "text-vermilion font-medium"
                    )}
                  >
                    {stage.step}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-foreground font-sans text-sm font-semibold">
                        {stage.title}
                      </h3>
                      <span
                        translate={stage.actor === "asym" ? "no" : undefined}
                        className="text-muted-foreground font-mono text-xs"
                      >
                        {stage.actor}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm leading-6">
                      {stage.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="text-muted-foreground mt-5 text-sm leading-6">
              Check{" "}
              <Link
                href="/#where-things-stand"
                prefetch={false}
                className="text-foreground hover:text-pine focus-visible:ring-ring focus-visible:ring-offset-background rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent"
              >
                the public code inventory
              </Link>{" "}
              for what exists in{" "}
              <span translate="no" className="font-mono text-xs">
                Asymmetric-al/core
              </span>{" "}
              today.
            </p>
          </div>

          <div className="min-w-0 lg:pt-2">
            <ApprovalBench />
          </div>
        </div>
      </div>
    </Container>
  </section>
);

import Link from "next/link";
import { Container } from "@/components/site/container";
import { GovernanceSequence } from "@/components/site/home/governance-sequence";
import { SectionTitle } from "@/components/site/home/section-heading";
import { ThemedPlate } from "@/components/site/themed-plate";

const SEAL_PLATE_ALT =
  "Copperplate pen-and-ink illustration of a human hand holding a turned-wood stamp poised above a blank folded letter with dashed drafting lines, a compass divider, a pine sprig, and a hatched vermilion wax seal.";

const SEAL_PLATE_SIZES = "(min-width: 1024px) 44vw, calc(100vw - 2rem)";

export const ProductSection = () => (
  <section
    id="appeals"
    aria-labelledby="appeals-title"
    className="scroll-mt-24 pb-[clamp(3.25rem,5.5vw,5rem)]"
  >
    <Container>
      <div className="border-rule border-t pt-12 sm:pt-16">
        <div className="max-w-[42rem]">
          <p className="text-draft inline-flex items-center gap-2 font-mono text-[0.8125rem] font-medium tracking-[0.02em]">
            <span
              aria-hidden="true"
              className="border-draft inline-block w-4 border-t-[1.5px] border-dashed"
            />
            In development · Planned AI appeal workflow
          </p>
          <SectionTitle id="appeals-title">
            Before an appeal goes out.
          </SectionTitle>
          <p className="text-muted-foreground mt-4 text-base leading-7 text-pretty sm:text-[1.0625rem] sm:leading-7">
            When a field project needs support, small teams shouldn’t rebuild
            giving pages, donor lists, and updates by hand. We’re building
            AI&#8209;drafted appeals that stay inside your existing permissions
            and wait for staff review before sending or publishing.
          </p>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:items-start lg:gap-12">
          {/* Plate II: single dashed copperplate impression directly on paper */}
          <figure className="min-w-0">
            <div className="plate-impression-draft aspect-[4/3] overflow-hidden">
              <ThemedPlate
                name="human-seal-plate"
                alt={SEAL_PLATE_ALT}
                sizes={SEAL_PLATE_SIZES}
              />
            </div>

            <figcaption className="border-rule mt-3 flex flex-wrap items-baseline justify-between gap-2 border-t pt-2.5 text-xs leading-5">
              <span className="text-foreground font-mono font-medium">
                Plate III · Staff review gate
              </span>
              <span className="text-muted-foreground">
                Draft &rarr; staff review &rarr; publish only after approval
              </span>
            </figcaption>

            <p className="text-muted-foreground mt-3 text-sm leading-6">
              See{" "}
              <Link
                href="/#where-things-stand"
                prefetch={false}
                className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-background rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-pine"
              >
                where things stand
              </Link>{" "}
              for what’s in public code versus planned.
            </p>
          </figure>

          <div className="min-w-0">
            <GovernanceSequence />
          </div>
        </div>
      </div>
    </Container>
  </section>
);

import Link from "next/link";
import { Container } from "@/components/site/container";
import { GovernanceSequence } from "@/components/site/home/governance-sequence";
import { SectionTitle } from "@/components/site/home/section-heading";
import { ThemedPlate } from "@/components/site/themed-plate";

const SEAL_PLATE_ALT =
  "Copperplate pen-and-ink illustration of a human hand holding a turned-wood stamp poised above a blank folded letter with dashed drafting lines, a compass divider, a pine sprig, and a hatched vermilion wax seal.";

const SEAL_PLATE_SIZES = "(min-width: 1024px) 44vw, calc(100vw - 3.75rem)";

export const ProductSection = () => (
  <section
    id="appeals"
    aria-labelledby="appeals-title"
    className="scroll-mt-20 pb-[clamp(3.25rem,5.5vw,5rem)]"
  >
    <Container>
      <div className="border-rule border-t pt-12 sm:pt-16">
        <div className="max-w-[42rem]">
          <p className="text-draft inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.02em]">
            <span
              aria-hidden="true"
              className="border-draft inline-block w-4 border-t-[1.5px] border-dashed"
            />
            In development · Planned AI appeal workflow
          </p>
          <SectionTitle id="appeals-title">
            Before an appeal goes out.
          </SectionTitle>
          <p className="text-muted-foreground mt-4 text-base leading-7 text-pretty sm:text-[1.0625rem] sm:leading-8">
            When a field project needs support, small teams shouldn’t rebuild
            giving pages, donor lists, and updates by hand. We’re building
            AI&#8209;drafted appeals that stay inside your existing permissions
            and wait for staff review before sending or publishing.
          </p>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:items-start lg:gap-12">
          {/* Bespoke editorial printmaking Plate II — zero fake campaign draft UI */}
          <figure className="min-w-0">
            <div className="surface-draft overflow-hidden rounded-2xl p-3 sm:p-4">
              <div className="border-rule aspect-[4/3] overflow-hidden rounded-xl border bg-[#f3eee3] dark:bg-[#111e28]">
                <ThemedPlate
                  name="human-seal-plate"
                  alt={SEAL_PLATE_ALT}
                  sizes={SEAL_PLATE_SIZES}
                />
              </div>
              <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs leading-5">
                <span className="text-foreground font-mono font-medium">
                  Plate II · Staff review gate
                </span>
                <span className="text-muted-foreground">
                  Planned: no AI-drafted appeal reaches a donor without staff
                  sign-off.
                </span>
              </figcaption>
            </div>

            <p className="text-muted-foreground mt-4 text-sm leading-6">
              See{" "}
              <Link
                href="/#where-things-stand"
                prefetch={false}
                className="text-foreground hover:text-pine focus-visible:ring-ring focus-visible:ring-offset-background rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent"
              >
                where things stand
              </Link>{" "}
              for what exists in the public repository today versus what is
              planned.
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

import { Container } from "@/components/site/container";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import {
  SurfaceAnchors,
  SurfaceExplorer,
} from "@/components/site/home/surface-explorer";

export const ArchitectureSection = () => (
  <section
    id="product"
    aria-labelledby="architecture-title"
    className="relative scroll-mt-24 pb-[clamp(3.25rem,5.5vw,5rem)]"
  >
    <SurfaceAnchors />
    <Container>
      <div className="border-rule border-t pt-12 sm:pt-16">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-[34rem]">
            <Eyebrow>In public code</Eyebrow>
            <SectionTitle id="architecture-title">
              Three workspaces on one shared record.
            </SectionTitle>
          </div>
          <p className="text-muted-foreground max-w-[32rem] text-sm leading-6 text-pretty sm:text-base sm:leading-7">
            <span translate="no" className="text-foreground font-medium">
              asym
            </span>{" "}
            runs on our public codebase (
            <span
              translate="no"
              className="text-foreground font-mono text-sm whitespace-nowrap"
            >
              Asymmetric-al/core
            </span>
            ). Donors, missionaries, and office staff each work in a dedicated
            app reading from the same tables, scoped to what their role should
            see.
          </p>
        </div>

        <SurfaceExplorer />
      </div>
    </Container>
  </section>
);

import { Container } from "@/components/site/container";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { SurfaceExplorer } from "@/components/site/home/surface-explorer";

export const ArchitectureSection = () => (
  <section
    id="product"
    aria-labelledby="architecture-title"
    className="scroll-mt-24 pb-[clamp(3.25rem,5.5vw,5rem)]"
  >
    <Container>
      <div className="border-rule border-t pt-12 sm:pt-16">
        <div className="max-w-[46rem]">
          <Eyebrow>In public code</Eyebrow>
          <SectionTitle id="architecture-title">
            Three workspaces on one shared record.
          </SectionTitle>
          <p className="text-muted-foreground mt-4 text-base leading-7 text-balance sm:text-[1.0625rem] sm:leading-7">
            <span translate="no" className="text-foreground font-medium">
              asym
            </span>{" "}
            runs on our public codebase (
            <span translate="no" className="text-foreground font-mono text-sm">
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

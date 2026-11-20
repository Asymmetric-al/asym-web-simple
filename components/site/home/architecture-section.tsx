import { Container } from "@/components/site/container";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { SurfaceExplorer } from "@/components/site/home/surface-explorer";

export const ArchitectureSection = () => (
  <section
    id="product"
    aria-labelledby="architecture-title"
    className="scroll-mt-20 pb-[clamp(3.25rem,5.5vw,5rem)]"
  >
    <Container>
      <div className="border-rule border-t pt-12 sm:pt-16">
        <div className="max-w-[40rem]">
          <Eyebrow>In public code · Asymmetric-al/core</Eyebrow>
          <SectionTitle id="architecture-title">
            Three surfaces, one shared record.
          </SectionTitle>
          <p className="text-muted-foreground mt-4 text-base leading-7 text-pretty sm:text-[1.0625rem] sm:leading-8">
            <span translate="no" className="text-foreground font-medium">
              Asymmetric-al/core
            </span>{" "}
            is structured as three dedicated apps over a single schema, so
            donors, field workers, and staff each see exactly what belongs to
            their role.
          </p>
        </div>

        <SurfaceExplorer />
      </div>
    </Container>
  </section>
);

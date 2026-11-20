import { Container } from "@/components/site/container";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const ordinaryWork = [
  { line: "A donor gives.", indentClass: "sm:pl-8" },
  { line: "A receipt goes out.", indentClass: "sm:pl-[4.5rem]" },
  { line: "A missionary sees the gift.", indentClass: "sm:pl-[7rem]" },
  {
    line: "Staff can find the donor and see what happened.",
    indentClass: "sm:pl-[9.5rem]",
  },
] as const;

export const AboutSection = () => (
  <section
    id="about"
    aria-labelledby="about-title"
    className="section-wash-accent py-[clamp(3.25rem,6vw,5.25rem)]"
  >
    <Container>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:gap-16">
        <div>
          <Eyebrow>About</Eyebrow>
          <SectionTitle id="about-title">
            Why we’re starting with missions teams.
          </SectionTitle>
        </div>

        <div className="text-muted-foreground max-w-[42rem] space-y-5 text-base leading-7 sm:text-lg sm:leading-8">
          <p className="text-foreground">
            Missions organizations coordinate recurring donor support, field
            workers, and projects across many people and places. Starting with
            that complexity builds a stronger foundation for nonprofits broadly.
          </p>
          <p>
            We’re Conrad and Blake. We’re building{" "}
            <span translate="no">asym</span> at{" "}
            <span translate="no">{siteConfig.name}</span>, an independent,
            for-profit software company serving nonprofits. Conrad’s experience
            co-leading Global Fellowship, a missions organization, shapes what
            we build first.
          </p>
        </div>
      </div>

      <div className="about-sweep mt-12 pt-1 pb-7 sm:mt-14 sm:pb-10">
        <p className="text-muted-foreground pl-5 text-sm sm:pl-8 sm:text-[0.9375rem]">
          The ordinary work comes first:
        </p>
        <ol className="font-heading text-foreground mt-3.5 text-[clamp(1.375rem,2.5vw,2.25rem)] leading-[1.2] font-semibold tracking-[-0.03em] [word-spacing:0.04em]">
          {ordinaryWork.map(({ line, indentClass }) => (
            <li key={line} className={cn("py-1.5 pl-5 sm:py-1.5", indentClass)}>
              {line}
            </li>
          ))}
        </ol>
      </div>
    </Container>
  </section>
);

import { Container } from "@/components/site/container";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { siteConfig } from "@/lib/config";

const ordinaryWork = [
  "A donor gives.",
  "A receipt goes out.",
  "A missionary sees the gift.",
  "Staff can find the donor and see what happened.",
] as const;

export const AboutSection = () => (
  <section
    id="about"
    aria-labelledby="about-title"
    className="section-wash-accent py-[clamp(3.25rem,6vw,5.25rem)]"
  >
    <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16">
      <div>
        <Eyebrow>About</Eyebrow>
        <SectionTitle id="about-title">
          Starting where we know the work.
        </SectionTitle>
        <div className="border-foreground/16 mt-8 border-l-2 pl-5">
          <p className="text-muted-foreground text-sm">
            The ordinary work comes first:
          </p>
          <ul className="font-heading text-foreground mt-3 space-y-1.5 text-lg font-medium tracking-normal [word-spacing:0.03em] sm:text-xl">
            {ordinaryWork.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-muted-foreground max-w-[42rem] space-y-5 text-base leading-7 sm:text-lg sm:leading-8 lg:pt-10">
        <p className="text-foreground">
          Missions teams manage recurring support, donor relationships, and
          projects across many people and places. They’re our first focus.
        </p>
        <p>
          <span translate="no">asym</span> is built by Conrad O’Brien and Blake
          at <span translate="no">{siteConfig.name}</span>, an independent
          for-profit software company. Conrad is Co-Executive Director of Global
          Fellowship, a missions organization, and that work is shaping the
          first release. You can follow what they’re building, commit by commit,
          in the{" "}
          <a
            href={siteConfig.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary focus-visible:ring-ring focus-visible:ring-offset-background rounded-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent"
          >
            public repository
          </a>
          .
        </p>
        <p>
          We’re building a foundation for other nonprofit workflows as the
          product develops.
        </p>
      </div>
    </Container>
  </section>
);

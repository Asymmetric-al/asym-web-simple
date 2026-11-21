import { Container } from "@/components/site/container";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { siteConfig } from "@/lib/config";

export const AboutSection = () => (
  <section
    id="about"
    aria-labelledby="about-title"
    className="scroll-mt-24 pb-16 sm:pb-20 lg:pb-24"
  >
    <Container>
      <div className="border-rule grid gap-8 border-t pt-14 sm:pt-18 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:gap-14">
        <div className="min-w-0">
          <Eyebrow>Company</Eyebrow>
          <SectionTitle id="about-title">
            Built from inside the work.
          </SectionTitle>
        </div>

        <div className="text-muted-foreground max-w-[40rem] space-y-4 text-base leading-7 text-pretty sm:text-[1.0625rem] sm:leading-8">
          <p className="text-foreground">
            <a
              href={siteConfig.githubOrgUrl}
              target="_blank"
              rel="noopener noreferrer"
              translate="no"
              className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-background rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
            >
              {siteConfig.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>{" "}
            is an independent, for-profit software company building{" "}
            <span translate="no" className="font-medium">
              {siteConfig.shortName}
            </span>{" "}
            for nonprofits of any size. We chose the name for a simple reason:
            the right tools create an asymmetric return, multiplying what an
            organization can accomplish without multiplying administrative drag.
          </p>
          <p>
            We’re Conrad O’Brien and Blake. Conrad co-leads Global Fellowship, a
            missions organization, which keeps our work grounded in the real
            giving, donor care, and coordination organizations handle every
            week. We’re starting with missions organizations because we know
            that work firsthand, with the goal of modern software any nonprofit
            can rely on.
          </p>

          <p className="text-foreground pt-2 font-sans text-sm font-semibold">
            Conrad O’Brien &amp; Blake{" "}
            <span className="text-muted-foreground font-normal">
              · Founders, <span translate="no">{siteConfig.name}</span>
            </span>
          </p>
        </div>
      </div>
    </Container>
  </section>
);

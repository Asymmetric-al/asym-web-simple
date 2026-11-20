import { Container } from "@/components/site/container";
import { siteConfig } from "@/lib/config";

const ordinaryWork = [
  { line: "A donor gives.", italic: false },
  { line: "A receipt goes out.", italic: true },
  { line: "A missionary sees the gift.", italic: false },
  { line: "Staff have the full picture.", italic: true },
] as const;

export const AboutSection = () => (
  <section
    id="about"
    aria-labelledby="about-title"
    className="midnight-band text-night-foreground border-night-rule scroll-mt-16 border-y py-[clamp(4rem,7vw,6.25rem)]"
  >
    <Container>
      {/* Monumental editorial interlude — appears here for the first and only time */}
      <div className="max-w-4xl">
        <p className="text-night-accent font-sans text-sm font-medium">
          The ordinary work comes first
        </p>
        <ol className="font-heading mt-5 space-y-1.5 text-[clamp(2rem,4.1vw,3.6rem)] leading-[1.08] font-medium tracking-[-0.025em]">
          {ordinaryWork.map(({ line, italic }) => (
            <li
              key={line}
              className={
                italic
                  ? "text-night-foreground/86 italic"
                  : "text-night-foreground"
              }
            >
              {line}
            </li>
          ))}
        </ol>
      </div>

      {/* Signed founder letter */}
      <div className="border-night-rule mt-12 grid gap-8 border-t pt-10 lg:mt-16 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:gap-14 lg:pt-12">
        <div className="min-w-0">
          <p className="text-night-accent font-sans text-sm font-medium">
            About the builders
          </p>
          <h2
            id="about-title"
            className="font-heading text-night-foreground mt-3 text-[clamp(1.9rem,3.4vw,2.85rem)] leading-[1.06] font-medium tracking-[-0.025em] text-balance"
          >
            Why we’re starting with missions organizations.
          </h2>
        </div>

        <div className="text-night-muted max-w-[40rem] space-y-4 text-base leading-7 text-pretty sm:text-[1.0625rem] sm:leading-8">
          <p className="text-night-foreground">
            Missions organizations coordinate recurring donor support, field
            workers, designated projects, and donor privacy rules across small
            staffs. Software built to stay accurate under that daily handoff
            serves nonprofits broadly as well.
          </p>
          <p>
            We’re Conrad O’Brien and Blake. We’re building{" "}
            <span translate="no" className="text-night-foreground font-medium">
              asym
            </span>{" "}
            at{" "}
            <a
              href={siteConfig.githubOrgUrl}
              target="_blank"
              rel="noopener noreferrer"
              translate="no"
              className="text-night-foreground hover:text-night-accent focus-visible:ring-ring focus-visible:ring-offset-night rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent"
            >
              {siteConfig.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            , an independent, for&#8209;profit software company serving
            nonprofits. Conrad’s work co&#8209;leading Global Fellowship, a
            missions organization, keeps our focus on the real office and field
            coordination small teams handle every week.
          </p>

          <div className="flex items-center gap-3.5 pt-2">
            <span
              aria-hidden="true"
              className="bg-night-accent inline-block h-[1.5px] w-8 shrink-0"
            />
            <p className="font-heading text-night-foreground text-xl italic">
              Conrad O’Brien &amp; Blake
            </p>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

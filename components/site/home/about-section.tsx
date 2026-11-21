import { Container } from "@/components/site/container";
import { siteConfig } from "@/lib/config";

const ordinaryWork = [
  { num: "01", line: "A gift is recorded.", italic: false },
  {
    num: "02",
    line: "The donor holds their receipt.",
    italic: true,
  },
  {
    num: "03",
    line: "The missionary sees support, donor privacy intact.",
    italic: false,
  },
  {
    num: "04",
    line: "Office staff keep one ledger.",
    italic: true,
  },
] as const;

export const AboutSection = () => (
  <section
    id="about"
    aria-labelledby="about-title"
    className="midnight-band text-night-foreground border-night-rule scroll-mt-16 border-y py-14 sm:py-20 lg:py-24"
  >
    <Container>
      {/* Monumental editorial interlude — four lines, calm Night Pine accents (reserving Vermilion strictly for human decisions) */}
      <div>
        <p className="text-night-accent font-sans text-sm font-medium">
          The ordinary work comes first
        </p>
        <ol className="divide-night-rule/75 border-night-rule mt-6 divide-y border-t">
          {ordinaryWork.map(({ num, line, italic }) => (
            <li
              key={num}
              className="flex items-baseline justify-between gap-6 py-3.5 sm:py-4"
            >
              <span
                className={
                  italic
                    ? "font-heading text-night-foreground/86 text-[clamp(1.85rem,3.6vw,3.15rem)] leading-[1.08] font-medium tracking-[-0.025em] italic"
                    : "font-heading text-night-foreground text-[clamp(1.85rem,3.6vw,3.15rem)] leading-[1.08] font-medium tracking-[-0.025em]"
                }
              >
                {line}
              </span>
              <span
                aria-hidden="true"
                className="text-night-accent shrink-0 font-mono text-xs tabular-nums"
              >
                {num}
              </span>
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
            Missions offices coordinate recurring donor support, designated
            funds, field workers, and donor privacy rules across small staffs
            every week. We build for that daily work first.
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
              className="text-night-foreground focus-visible:ring-ring focus-visible:ring-offset-night rounded-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-night-accent"
            >
              {siteConfig.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            , an independent, for-profit software company serving nonprofits.
            Conrad’s work co-leading Global Fellowship, a missions organization,
            keeps our focus on the real office and field coordination small
            teams handle daily.
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

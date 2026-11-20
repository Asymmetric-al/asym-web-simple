import { Container } from "@/components/site/container";
import { siteConfig } from "@/lib/config";

const deskBoundaries = [
  {
    index: "01",
    role: "Donor",
    app: "apps/donor",
    surface: "Giving page, receipt #R\u20110418 & donor portal",
    sees: "Their own gifts, recurring pledges, yearly tax statements, and whether a missionary sees their name.",
    boundary: "Self-service history without emailing the office.",
  },
  {
    index: "02",
    role: "Missionary",
    app: "apps/missionary",
    surface: "Assigned partner roster & ministry updates",
    sees: "Active partners, cadence, and support progress for their own field assignment.",
    boundary:
      "Anonymous donors are redacted on the server as Anonymous partner; org-wide accounts stay hidden.",
  },
  {
    index: "03",
    role: "Office",
    app: "apps/admin",
    surface: "Fund 310-EAST-WATER ledger & staff CRM",
    sees: "Legal donor identity, receipt records, email templates, and pre-action change previews.",
    boundary:
      "Full stewardship record today; human sign-off rules for AI appeals in development.",
  },
] as const;

export const AboutSection = () => (
  <section
    id="about"
    aria-labelledby="about-title"
    className="midnight-band text-night-foreground border-night-rule scroll-mt-16 border-y py-[clamp(3.75rem,6.5vw,5.75rem)]"
  >
    <Container>
      {/* Hero-scale original architectural plate: one contribution crossing three server-enforced boundaries */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-night-accent font-sans text-sm font-medium">
            Three desks, one schema
          </p>
          <h2 className="font-heading text-night-foreground mt-2.5 text-[clamp(2rem,3.8vw,3.35rem)] leading-[1.03] font-medium tracking-[-0.028em] text-balance">
            One gift crosses{" "}
            <span className="italic">three permission boundaries.</span>
          </h2>
        </div>
        <p className="text-night-muted font-mono text-xs leading-5 lg:text-right">
          Sample path: GIFT-0418 · Fund 310-EAST-WATER
          <span className="block">Server-scoped projections in core</span>
        </p>
      </div>

      {/* Archival horizontal datum rail (desktop SVG architectural line) */}
      <div className="mt-8" aria-hidden="true">
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 36"
          fill="none"
          preserveAspectRatio="none"
          className="hidden h-9 w-full lg:block"
        >
          <line
            x1="0"
            y1="18"
            x2="1200"
            y2="18"
            stroke="currentColor"
            strokeOpacity="0.24"
            strokeWidth="1"
          />
          <line
            x1="200"
            y1="18"
            x2="1000"
            y2="18"
            stroke="#62bda8"
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />
          <circle cx="200" cy="18" r="5" fill="#62bda8" />
          <line
            x1="200"
            y1="23"
            x2="200"
            y2="36"
            stroke="#62bda8"
            strokeOpacity="0.55"
            strokeWidth="1"
          />
          <circle cx="600" cy="18" r="5" fill="#62bda8" />
          <line
            x1="600"
            y1="23"
            x2="600"
            y2="36"
            stroke="#62bda8"
            strokeOpacity="0.55"
            strokeWidth="1"
          />
          <circle cx="1000" cy="18" r="5" fill="#f08066" />
          <line
            x1="1000"
            y1="23"
            x2="1000"
            y2="36"
            stroke="#f08066"
            strokeOpacity="0.65"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="mt-4 grid gap-4 lg:mt-0 lg:grid-cols-3 lg:gap-5">
        {deskBoundaries.map((desk) => (
          <div
            key={desk.role}
            className="border-night-rule flex flex-col justify-between rounded-xl border bg-[rgb(243_238_227/4%)] p-5 sm:p-6"
          >
            <div>
              <div className="flex items-center justify-between gap-2 font-mono text-xs">
                <span className="text-night-accent font-medium">
                  {desk.index} · {desk.role}
                </span>
                <span className="border-night-rule text-night-foreground/90 rounded-full border px-2.5 py-0.5">
                  {desk.app}
                </span>
              </div>
              <h3 className="font-heading text-night-foreground mt-3 text-xl leading-snug font-medium tracking-[-0.015em]">
                {desk.surface}
              </h3>
              <p className="text-night-muted mt-2.5 text-sm leading-6 text-pretty">
                {desk.sees}
              </p>
            </div>

            <p className="border-night-rule text-night-foreground/90 mt-4 border-t border-dashed pt-3 text-xs leading-5">
              {desk.boundary}
            </p>
          </div>
        ))}
      </div>

      {/* Signed founder letter */}
      <div className="border-night-rule mt-12 grid gap-8 border-t pt-10 lg:mt-14 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:gap-14 lg:pt-12">
        <div className="min-w-0">
          <p className="text-night-accent font-sans text-sm font-medium">
            About the builders
          </p>
          <h2
            id="about-title"
            className="font-heading text-night-foreground mt-3 text-[clamp(1.85rem,3.2vw,2.75rem)] leading-[1.06] font-medium tracking-[-0.025em] text-balance"
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

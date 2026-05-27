import { Container } from "@/components/site/page";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Image from "next/image";

const mailtoHref = `mailto:${siteConfig.email}?subject=Building%20with%20Asym`;
const contributeHref =
  "https://github.com/Asymmetric-al/core?tab=contributing-ov-file#readme";

export const metadata: Metadata = createMetadata({
  title: "Asym is being built for missions organizations",
  description:
    "A letter from Conrad and Blake about the early build of Asym, a product for Christian missions organizations and the teams carrying donor care, finance, missionary support, and operations.",
  path: "/",
});

function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function LandscapeBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <Image
        src="/BG.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="[transform:scale(1.035)] object-cover object-[54%_42%] brightness-[1.04] contrast-[1.06] saturate-[1.08] dark:opacity-[0.7] dark:brightness-[0.66] dark:contrast-[1.08]"
      />
      <div className="from-background/78 via-background/18 to-background/64 dark:from-background/88 dark:via-background/42 dark:to-background/82 absolute inset-0 bg-gradient-to-b" />
      <div className="from-background/94 via-background/52 to-background/4 dark:from-background/92 dark:via-background/66 dark:to-background/24 absolute inset-0 bg-gradient-to-r" />
      <div className="from-accent/16 to-primary/12 dark:from-accent/10 dark:to-primary/10 absolute inset-0 bg-gradient-to-tr via-transparent" />
      <div
        className="absolute inset-0 opacity-[0.2] mix-blend-overlay dark:opacity-[0.24] dark:mix-blend-soft-light"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 2px, transparent 4px, color-mix(in srgb, var(--foreground) 14%, transparent) 4px, color-mix(in srgb, var(--foreground) 14%, transparent) 5px), linear-gradient(90deg, transparent 2px, transparent 4px, color-mix(in srgb, var(--foreground) 14%, transparent) 4px, color-mix(in srgb, var(--foreground) 14%, transparent) 5px)",
          backgroundSize: "5px 5px",
        }}
      />
    </div>
  );
}

export default function HomePage() {
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    email: siteConfig.email,
    description: siteConfig.description,
    areaServed: "Global",
    knowsAbout: [
      "missions software",
      "donor care",
      "missionary support",
      "nonprofit operations",
    ],
    parentOrganization: {
      "@type": "NGO",
      name: siteConfig.nonprofit,
    },
  };

  const softwareStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.shortName,
    applicationCategory: "Missions software",
    operatingSystem: "Web",
    description:
      "An early product for Christian missions organizations, built by the nonprofit ministry Asymmetric.al.",
    provider: {
      "@type": "NGO",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <main
      id="main-content"
      className="relative isolate overflow-hidden"
      tabIndex={-1}
    >
      <StructuredData data={organizationStructuredData} />
      <StructuredData data={softwareStructuredData} />
      <LandscapeBackground />

      <article className="pb-12 sm:pb-16">
        <Container className="max-w-[76rem]">
          <div
            id="letter"
            className="text-foreground max-w-[45rem] scroll-mt-32 pt-[clamp(7.4rem,9vw,9.5rem)] text-[1.03rem] leading-[1.68] font-normal sm:text-[1.1rem] sm:leading-[1.72] lg:ml-0"
          >
            <h1 className="font-heading max-w-[12ch] text-[clamp(2.5rem,6vw,4.25rem)] leading-[0.94] font-bold tracking-[-0.075em] text-balance">
              We&rsquo;re building Asym.
            </h1>

            <div className="mt-9 space-y-3.5 sm:space-y-4">
              <p>We&rsquo;re Conrad and Blake.</p>
              <p>
                Asym is a product for Christian missions organizations.
                Asymmetric.al is the nonprofit ministry behind it.
              </p>
              <p>We don&rsquo;t have customers yet.</p>
              <p>
                We do have a few organizations waiting to use it, a clear
                problem in front of us, and we&rsquo;re building nonstop.
              </p>
              <p>
                It is very early. Some parts are still ugly. Some parts are
                half-wired. Some parts work well enough that you can already see
                where this is going.
              </p>
            </div>

            <section
              id="why"
              aria-labelledby="vision-heading"
              className="scroll-mt-32 space-y-3.5 pt-8 sm:space-y-4 sm:pt-9"
            >
              <h2
                id="vision-heading"
                className="font-heading text-foreground text-[clamp(1.5rem,3vw,2.125rem)] leading-tight font-bold tracking-[-0.055em] text-balance"
              >
                The vision is simple.
              </h2>
              <p>
                Christian missions organizations should not need five
                disconnected tools, three spreadsheets, two CRMs, and a
                part-time miracle worker just to keep donors, missionaries,
                gifts, receipts, websites, emails, reports, and workflows from
                falling apart.
              </p>
              <p>That is not a small problem.</p>
              <p>
                It eats hours every week from people who already carry a lot.
              </p>
              <p>
                Mobilizers chase candidate paperwork. Finance teams reconcile
                gifts by hand. Missionaries wonder who gave, who stopped giving,
                and who needs a thank-you. Donors want a clean way to give,
                manage their gifts, and get receipts. Member Care teams try to
                keep track of conversations, next steps, and care history in
                systems that were not built for that work. Leaders want to know
                what is actually happening without asking someone to pull
                another report.
              </p>
              <p>
                Most of the time, the people doing the work are not asking for
                something flashy.
              </p>
              <p>
                They just want software that does not make their day harder.
              </p>
              <p>That is what Asym is trying to become.</p>
              <p>One Mission Control for missions and nonprofit operations.</p>
              <p>
                Giving. CRM. Donor portal. Missionary portal. Receipts.
                Statements. Automations. Reports. Websites. Email. AI help where
                it is actually useful.
              </p>
              <p>Not another dashboard for the sake of having a dashboard.</p>
              <p>
                A working system that takes the operational weight off Christian
                missions organizations, so their teams can stay focused on
                people and the Gospel.
              </p>
            </section>

            <section
              aria-labelledby="bothers-heading"
              className="scroll-mt-32 space-y-3.5 pt-8 sm:space-y-4 sm:pt-9"
            >
              <h2
                id="bothers-heading"
                className="font-heading text-foreground text-[clamp(1.5rem,3vw,2.125rem)] leading-tight font-bold tracking-[-0.055em] text-balance"
              >
                That bothers us.
              </h2>
              <p>
                We think missions technology is way behind where it should be.
              </p>
              <p>Not because the work is unimportant.</p>
              <p>Because the market is weird.</p>
              <p>
                The people doing some of the most meaningful work in the world
                often get stuck with the worst tools, because they are not a
                flashy customer segment and they do not have enterprise budgets.
              </p>
              <p>That bothers us.</p>
              <p>
                It bothers us that a missionary can raise support from fifty
                people and still not have a simple way to know who gave, who
                needs care, and what to do next.
              </p>
              <p>
                It bothers us that finance teams doing sacred trust work with
                donor money have to fight broken exports and manual
                reconciliation.
              </p>
              <p>
                It bothers us that small missions teams often have to choose
                between expensive legacy software or duct-taped tools that
                constantly break.
              </p>
              <p>We are not okay with that.</p>
            </section>

            <section
              id="product"
              aria-labelledby="product-heading"
              className="scroll-mt-32 space-y-3.5 pt-8 sm:space-y-4 sm:pt-9"
            >
              <h2
                id="product-heading"
                className="font-heading text-foreground text-[clamp(1.5rem,3vw,2.125rem)] leading-tight font-bold tracking-[-0.055em] text-balance"
              >
                The product is early. The mission is not.
              </h2>
              <p>
                Asym exists because we believe small teams should be able to do
                more with less.
              </p>
              <p>Not by working longer hours.</p>
              <p>Not by adding more admin.</p>
              <p>
                By giving them tools that quietly handle the boring parts, so
                they can stay focused on people, prayer, sending, care,
                discipleship, and the Gospel.
              </p>
              <p>That is the purpose.</p>
              <p>The product is early.</p>
              <p>The mission is not.</p>
            </section>

            <section
              id="builders"
              aria-labelledby="builders-heading"
              className="scroll-mt-32 space-y-3.5 pt-8 sm:space-y-4 sm:pt-9"
            >
              <h2
                id="builders-heading"
                className="font-heading text-foreground text-[clamp(1.5rem,3vw,2.125rem)] leading-tight font-bold tracking-[-0.055em] text-balance"
              >
                We are looking for builders.
              </h2>
              <p>
                We are looking for people who want to build with us before it is
                obvious.
              </p>
              <p>
                People who can handle messy. People who care about craft, but do
                not need perfect conditions to start. People who can ship,
                learn, fix, and keep going.
              </p>
              <p>
                People who understand that software can either drain a ministry
                team or give them time back.
              </p>
              <p>
                We need builders who are comfortable owning real pieces of the
                system.
              </p>
              <p>Not fake ownership.</p>
              <p>Real ownership.</p>
              <p>
                You might work on the donor portal one week, Stripe flows the
                next, Mission Control after that, then a receipt PDF bug that
                absolutely has to work before year-end giving.
              </p>
              <p>This is not a polished big-company job.</p>
              <p>There is no giant team around each feature.</p>
              <p>There is a lot to build, and every good decision matters.</p>
              <p>
                Money data has to be right. People data has to be safe.
                Permissions have to hold. Receipts have to send. Reports have to
                match.
              </p>
              <p>The boring details matter because the mission matters.</p>
            </section>

            <section
              aria-labelledby="work-heading"
              className="scroll-mt-32 space-y-3.5 pt-8 sm:space-y-4 sm:pt-9"
            >
              <h2
                id="work-heading"
                className="font-heading text-foreground text-[clamp(1.5rem,3vw,2.125rem)] leading-tight font-bold tracking-[-0.055em] text-balance"
              >
                The work is ordinary before it is big.
              </h2>
              <p>
                We think Asym can become the operating system for Christian
                missions organizations.
              </p>
              <p>That sounds big because it is.</p>
              <p>But the first version is much more ordinary.</p>
              <p>A donor gives.</p>
              <p>A receipt sends.</p>
              <p>A missionary sees the gift.</p>
              <p>A staff member can find the donor.</p>
              <p>A finance person can export the report.</p>
              <p>A leader can understand what happened.</p>
              <p>Then we make that smoother.</p>
              <p>Then we make it faster.</p>
              <p>Then we connect the next piece.</p>
              <p>That is the work.</p>
              <p>Small inputs. Real output.</p>
              <p>
                A few good builders can change the daily life of a lot of
                missions teams.
              </p>
              <p>That is what we want to build this around.</p>
              <p>
                If you are looking for a clean, predictable, already-figured-out
                thing, this probably is not it.
              </p>
              <p>
                If you want to help build the foundation for something that
                could serve thousands of missionaries and the organizations
                behind them, we should talk.
              </p>
              <p>Asym is early.</p>
              <p>We are building nonstop.</p>
              <p>And we think this is worth giving ourselves to.</p>
              <p>- Conrad and Blake</p>
            </section>

            <section
              id="talk"
              aria-labelledby="talk-title"
              className="scroll-mt-32 pt-9 sm:pt-10"
            >
              <h2
                id="talk-title"
                className="font-heading text-foreground text-[clamp(1.5rem,3vw,2.125rem)] leading-tight font-bold tracking-[-0.055em] text-balance"
              >
                Want to build with us?
              </h2>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-base leading-7">
                <a
                  href={mailtoHref}
                  className="text-primary hover:text-foreground focus-visible:ring-ring/45 rounded-sm font-medium underline underline-offset-4 transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
                >
                  Send us an email.
                </a>
                <a
                  href={contributeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-foreground focus-visible:ring-ring/45 rounded-sm font-medium underline underline-offset-4 transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
                >
                  Contribute.
                </a>
              </div>
            </section>
          </div>
        </Container>
      </article>
    </main>
  );
}

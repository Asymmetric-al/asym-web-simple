import { InquiryForm } from "@/components/site/inquiry-form";
import { PageHero, Section } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const supportBullets = [
  "Early access updates",
  "Product walkthrough invitations",
  "Rollout conversations for qualified organizations",
  "Optional interest in Managed Donor Care + Ops support",
] as const;

export const metadata: Metadata = createMetadata({
  title: "Join the Waitlist",
  description:
    "Join the waitlist for Asym to get early access updates, walkthrough invitations, and rollout conversations for qualified Christian missions organizations.",
  path: "/waitlist",
});

export default function WaitlistPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Waitlist"
        title={
          <h1 className="font-heading text-foreground text-[clamp(3rem,6vw,5rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
            Join the waitlist for Asym.
          </h1>
        }
        description="Be among the first Christian missions organizations to see how Asym can replace disconnected tools, reduce manual handoffs, and give your team one mission-built system for donor care, missionary support, and operations."
        meta={[
          "Early access updates",
          "Product walkthrough invitations",
          "Qualified rollout conversations",
          "Managed support stays optional",
        ]}
      >
        <Reveal trigger="mount">
          <Card className="page-shell-glow surface-interactive border-foreground/10 bg-primary text-primary-foreground rounded-[2rem] border shadow-[0_32px_82px_-56px_rgba(22,33,43,0.82)]">
            <CardHeader>
              <p className="text-primary-foreground/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                What the waitlist does
              </p>
              <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                Early access with a clear next step.
              </CardTitle>
            </CardHeader>
            <CardContent className="text-primary-foreground/82 flex flex-col gap-3 text-sm leading-7">
              <p>The waitlist routes early access updates, walkthrough invitations, and qualified rollout conversations.</p>
              <p>Managed Donor Care + Ops stays secondary and is never required to use Asym.</p>
              <p>If managed support matters to your team, mention it in your note and we can talk through it.</p>
            </CardContent>
          </Card>
        </Reveal>
      </PageHero>

      <Section className="section-divider-accent">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StaggerReveal>
            {supportBullets.map((item, index) => (
              <StaggerItem key={item}>
                <Card className="surface-card surface-interactive h-full rounded-[1.8rem]">
                  <CardHeader>
                    <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                      0{index + 1}
                    </p>
                    <CardTitle className="font-heading text-xl font-semibold tracking-[-0.04em]">
                      {item}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </Section>

      <Section tone="sky">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
          <Reveal>
            <Card className="page-shell-glow surface-panel surface-interactive rounded-[2rem] p-1">
              <CardHeader className="pb-0">
                <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                  Before you submit
                </p>
                <CardTitle className="font-heading text-3xl font-semibold tracking-[-0.05em]">
                  Tell us where the drag is showing up first.
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground flex flex-col gap-4 text-base leading-7">
                <p>
                  Share your organization, your role, and the main area where disconnected tools are creating drag so the first reply can be useful.
                </p>
                <p>
                  If managed support matters, mention it in your note so we can route the conversation well.
                </p>
              </CardContent>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <InquiryForm kind="waitlist" />
          </Reveal>
        </div>
      </Section>
    </main>
  );
}

import { DonationSuccessActions } from "@/components/site/donation-success-actions";
import { PageHero, Section } from "@/components/site/page";
import { Reveal } from "@/components/site/reveal";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import {
  GIVE_PAGE_METADATA_SOURCE,
  isValidCheckoutSessionId,
} from "@/lib/stripe-giving";
import { getStripe } from "@/lib/stripe-server";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = createMetadata({
  title: "Thank you",
  description:
    "Thank you for supporting Asymmetric.al through Global Fellowship Inc.",
  path: "/give/success",
});

export default async function GiveSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const rawSessionId =
    typeof params.session_id === "string" ? params.session_id.trim() : "";
  const sessionId = isValidCheckoutSessionId(rawSessionId) ? rawSessionId : null;

  const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);

  let portalEligible = false;
  if (sessionId && stripeConfigured) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      portalEligible =
        session.status === "complete" &&
        session.metadata?.source === GIVE_PAGE_METADATA_SOURCE &&
        session.mode === "subscription";
    } catch {
      portalEligible = false;
    }
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow="Thank you"
        title={
          <h1 className="font-heading text-foreground text-[clamp(2.5rem,5vw,4rem)] leading-[0.96] font-semibold tracking-[-0.07em] text-balance">
            Your gift is received.
          </h1>
        }
        description="Stripe will email a receipt. Global Fellowship Inc. (EIN 68-0214543) provides tax documentation for qualifying gifts."
        actions={[
          { label: "Return to Give", href: "/give" },
          { label: "Contact", href: "/contact", variant: "outline" },
        ]}
        meta={["501(c)(3) covering", "Open source build", "Receipt via email"]}
      >
        <Reveal trigger="mount">
          <Card className="page-shell-glow surface-interactive border-foreground/10 bg-primary text-primary-foreground rounded-[2rem] border shadow-[0_32px_82px_-56px_rgba(22,33,43,0.82)]">
            <CardHeader>
              <div className="bg-primary-foreground/12 flex size-12 items-center justify-center rounded-2xl">
                <Heart className="size-6" aria-hidden />
              </div>
              <CardTitle className="font-heading text-2xl font-semibold tracking-[-0.05em]">
                Grateful for your partnership.
              </CardTitle>
            </CardHeader>
            <CardContent className="text-primary-foreground/85 space-y-4 text-sm leading-7">
              <p>
                Every gift fuels shared infrastructure for missions
                organizations — security work, documentation, and careful
                onboarding for pilot partners.
              </p>
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "default" }),
                  "rounded-full",
                )}
              >
                Back to home
              </Link>
            </CardContent>
          </Card>
        </Reveal>
      </PageHero>

      <Section tone="sky" className="section-divider-accent">
        <div className="mx-auto max-w-xl">
          <Reveal>
            <div className="surface-panel surface-interactive rounded-[2rem] p-7 sm:p-8">
              <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                Recurring donors
              </p>
              <h2 className="font-heading mt-3 text-2xl font-semibold tracking-[-0.05em]">
                Need to update your monthly gift?
              </h2>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                Use the secure Stripe donor portal linked to your checkout
                session.
              </p>
              <div className="mt-6">
                <DonationSuccessActions
                  sessionId={sessionId}
                  stripeConfigured={stripeConfigured}
                  portalEligible={portalEligible}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}

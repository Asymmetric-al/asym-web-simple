"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  ONE_TIME_AMOUNTS_CENTS,
  type RecurringTier,
} from "@/lib/donation-tiers";
import { cn } from "@/lib/utils";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ArrowLeft, Lock } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

const stripePromise =
  publishableKey.length > 0 ? loadStripe(publishableKey) : null;

type CheckoutParams =
  | {
      mode: "subscription";
      recurringTier: RecurringTier;
      customerEmail?: string | undefined;
    }
  | {
      mode: "payment";
      amountCents: number;
      customerEmail?: string | undefined;
    };

function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function DonationCheckout({
  stripeConfigured,
  recurringConfigured,
}: {
  stripeConfigured: boolean;
  recurringConfigured: boolean;
}) {
  const [giftTab, setGiftTab] = useState<"monthly" | "once">(
    recurringConfigured ? "monthly" : "once",
  );
  const [recurringTier, setRecurringTier] = useState<RecurringTier>("50");
  const [oneTimeCents, setOneTimeCents] =
    useState<(typeof ONE_TIME_AMOUNTS_CENTS)[number]>(10_000);
  const [email, setEmail] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [checkoutKey, setCheckoutKey] = useState(0);

  const paramsRef = useRef<CheckoutParams | null>(null);

  const canUseStripe =
    stripeConfigured && stripePromise !== null && publishableKey.length > 0;

  const fetchClientSecret = useCallback(async () => {
    const params = paramsRef.current;
    if (!params) {
      throw new Error("Missing checkout parameters.");
    }

    const payload =
      params.mode === "subscription"
        ? {
            mode: "subscription" as const,
            recurringTier: params.recurringTier,
            ...(params.customerEmail
              ? { customerEmail: params.customerEmail }
              : {}),
          }
        : {
            mode: "payment" as const,
            amountCents: params.amountCents,
            ...(params.customerEmail
              ? { customerEmail: params.customerEmail }
              : {}),
          };

    const res = await fetch("/api/donations/checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await res.json()) as { clientSecret?: string; error?: string };
    if (!res.ok || !data.clientSecret) {
      throw new Error(data.error ?? "Could not start checkout.");
    }
    return data.clientSecret;
  }, []);

  const startCheckout = () => {
    setFormError(null);

    if (!canUseStripe) {
      setFormError("Online giving is not configured on this deployment.");
      return;
    }

    const trimmed = email.trim();
    if (trimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setFormError("Enter a valid email, or leave it blank for checkout.");
      return;
    }

    if (giftTab === "monthly") {
      if (!recurringConfigured) {
        setFormError(
          "Monthly giving is not configured yet. Choose a one-time gift or email info@asymmetric.al.",
        );
        return;
      }
      paramsRef.current = trimmed
        ? { mode: "subscription", recurringTier, customerEmail: trimmed }
        : { mode: "subscription", recurringTier };
    } else {
      paramsRef.current = trimmed
        ? { mode: "payment", amountCents: oneTimeCents, customerEmail: trimmed }
        : { mode: "payment", amountCents: oneTimeCents };
    }

    setCheckoutKey((k) => k + 1);
    setCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setCheckoutOpen(false);
    paramsRef.current = null;
  };

  const oneTimeOptions = useMemo(
    () =>
      ONE_TIME_AMOUNTS_CENTS.map((cents) => ({
        cents,
        label: formatUsd(cents),
      })),
    [],
  );

  if (!canUseStripe) {
    return (
      <Card className="surface-panel surface-interactive border-foreground/10 rounded-[2rem]">
        <CardHeader>
          <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
            Online giving
          </p>
          <CardTitle className="font-heading text-2xl font-semibold tracking-[-0.05em]">
            Card giving is coming online.
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-3 text-sm leading-7">
          <p>
            This preview deployment does not have Stripe keys configured. Use
            check, DAF, or email info@asymmetric.al — or add keys locally per{" "}
            <span className="text-foreground/90 font-medium">docs/STRIPE-GIVING.md</span>.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (checkoutOpen && stripePromise) {
    return (
      <Card className="surface-panel surface-interactive border-foreground/10 overflow-hidden rounded-[2rem]">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-6">
          <div>
            <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
              Secure checkout
            </p>
            <CardTitle className="font-heading mt-1 text-xl font-semibold tracking-[-0.04em]">
              Complete your gift
            </CardTitle>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={closeCheckout}
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <EmbeddedCheckoutProvider
            key={checkoutKey}
            stripe={stripePromise}
            options={{ fetchClientSecret }}
          >
            <EmbeddedCheckout className="rounded-2xl" />
          </EmbeddedCheckoutProvider>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="surface-panel surface-interactive border-foreground/10 rounded-[2rem]">
      <CardHeader>
        <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
          Online giving
        </p>
        <CardTitle className="font-heading text-2xl font-semibold tracking-[-0.05em]">
          Give in a few steps.
        </CardTitle>
        <p className="text-muted-foreground text-sm leading-7">
          Processed by Stripe. Tax-deductible gifts to Global Fellowship Inc.
          (EIN 68-0214543) for the Asymmetric.al project.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs
          value={giftTab}
          onValueChange={(v) => {
            if (v === "monthly" || v === "once") setGiftTab(v);
          }}
          className="gap-5"
        >
          <TabsList className="grid w-full grid-cols-2 rounded-[1.25rem] p-1">
            <TabsTrigger
              value="monthly"
              disabled={!recurringConfigured}
              className="rounded-[1rem] py-2.5 text-sm"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger value="once" className="rounded-[1rem] py-2.5 text-sm">
              One-time
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="mt-0 space-y-4">
            {!recurringConfigured ? (
              <p className="text-muted-foreground text-sm leading-7">
                Monthly tiers are not configured on this deployment. Use
                one-time or contact info@asymmetric.al.
              </p>
            ) : (
              <>
                <p className="text-muted-foreground text-sm leading-7">
                  Pick a monthly support level. You can update or cancel anytime
                  through the donor portal after checkout.
                </p>
                <ToggleGroup
                  multiple={false}
                  value={[recurringTier]}
                  onValueChange={(vals) => {
                    const v = vals[0];
                    if (v === "25" || v === "50" || v === "100") {
                      setRecurringTier(v);
                    }
                  }}
                  variant="outline"
                  spacing={0}
                  className="w-full"
                >
                  {(
                    [
                      ["25", "$25/mo"],
                      ["50", "$50/mo"],
                      ["100", "$100/mo"],
                    ] as const
                  ).map(([value, label]) => (
                    <ToggleGroupItem
                      key={value}
                      value={value}
                      className="flex-1 rounded-none py-3 text-sm font-medium first:rounded-l-[1rem] last:rounded-r-[1rem]"
                    >
                      {label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </>
            )}
          </TabsContent>

          <TabsContent value="once" className="mt-0 space-y-4">
            <p className="text-muted-foreground text-sm leading-7">
              Choose an amount. Preset tiers keep processing simple and auditable.
            </p>
            <ToggleGroup
              multiple={false}
              value={[String(oneTimeCents)]}
              onValueChange={(vals) => {
                const v = vals[0];
                const n = Number(v);
                if (
                  ONE_TIME_AMOUNTS_CENTS.includes(
                    n as (typeof ONE_TIME_AMOUNTS_CENTS)[number],
                  )
                ) {
                  setOneTimeCents(n as (typeof ONE_TIME_AMOUNTS_CENTS)[number]);
                }
              }}
              variant="outline"
              className="flex w-full flex-wrap justify-stretch gap-2"
            >
              {oneTimeOptions.map(({ cents, label }) => (
                <ToggleGroupItem
                  key={cents}
                  value={String(cents)}
                  className="min-w-[calc(50%-0.25rem)] flex-1 rounded-[1rem] py-3 text-sm font-medium sm:min-w-[calc(33.333%-0.34rem)]"
                >
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </TabsContent>
        </Tabs>

        <FieldGroup>
          <Field>
            <FieldContent>
              <FieldLabel htmlFor="donor-email">Email (optional)</FieldLabel>
              <Input
                id="donor-email"
                type="email"
                autoComplete="email"
                placeholder="you@organization.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-2xl"
              />
              <FieldDescription>
                Pre-fills Stripe checkout. You can also enter it on the next
                step.
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldGroup>

        {formError ? (
          <p className="text-destructive text-sm" role="alert">
            {formError}
          </p>
        ) : null}

        <Button
          type="button"
          size="lg"
          className={cn("w-full rounded-full px-6")}
          onClick={startCheckout}
          disabled={giftTab === "monthly" && !recurringConfigured}
        >
          <Lock className="size-4 opacity-80" />
          Continue to secure checkout
        </Button>

        <p className="text-muted-foreground text-center text-xs leading-5">
          By continuing you agree to Stripe&apos;s terms. Global Fellowship Inc.
          issues tax receipts for qualifying gifts.
        </p>
      </CardContent>
    </Card>
  );
}

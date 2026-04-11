"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function DonationSuccessActions({
  sessionId,
  stripeConfigured,
  portalEligible,
}: {
  sessionId: string | null;
  stripeConfigured: boolean;
  /** Server-verified: completed give_page subscription checkout */
  portalEligible: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openPortal = async () => {
    if (!sessionId) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/donations/billing-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Could not open the donor portal.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again or email info@asymmetric.al.");
      setLoading(false);
    }
  };

  if (!stripeConfigured) {
    return null;
  }

  if (!sessionId || !portalEligible) {
    return (
      <p className="text-muted-foreground text-sm leading-7">
        {sessionId && !portalEligible
          ? "If you gave monthly, use the link in your Stripe receipt email to manage your subscription, or contact info@asymmetric.al."
          : "If you need to manage a recurring gift, email info@asymmetric.al with the email you used at checkout."}
      </p>
    );
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="rounded-full"
        disabled={loading}
        onClick={() => void openPortal()}
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Opening portal…
          </>
        ) : (
          "Manage recurring gift"
        )}
      </Button>
      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : (
        <p className="text-muted-foreground text-xs leading-5">
          Update your card, view invoices, or cancel monthly support.
        </p>
      )}
    </div>
  );
}

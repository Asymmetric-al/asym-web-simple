export interface EarlyAccessDeliveryConfig {
  readonly apiKey: string;
  readonly inbox: string;
  readonly from: string;
  readonly contactEmail: string;
}

/**
Only publish a direct email address once inbound mail (MX + monitored inbox)
has been verified and explicitly configured for this deployment.
*/
export const getVerifiedContactEmail = (): string | null => {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  return email && email.includes("@") ? email : null;
};

/**
All four values are required: outbound Resend delivery credentials plus a
verified private contact address so first-time applicants always have a
private way to reach the team for questions, corrections, or deletion.
*/
export const readEarlyAccessDeliveryConfig =
  (): EarlyAccessDeliveryConfig | null => {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const inbox = process.env.CONTACT_INBOX_EMAIL?.trim();
    const from = process.env.CONTACT_FROM_EMAIL?.trim();
    const contactEmail = getVerifiedContactEmail();

    return apiKey && inbox && from && contactEmail
      ? { apiKey, inbox, from, contactEmail }
      : null;
  };

export const isEarlyAccessConfigured = (): boolean =>
  readEarlyAccessDeliveryConfig() !== null;

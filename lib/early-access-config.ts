export interface EarlyAccessDeliveryConfig {
  readonly apiKey: string;
  readonly inbox: string;
  readonly from: string;
}

/**
All three values are required. There is deliberately no default inbox, so a
request is only accepted once someone has configured where it goes.
*/
export const readEarlyAccessDeliveryConfig =
  (): EarlyAccessDeliveryConfig | null => {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const inbox = process.env.CONTACT_INBOX_EMAIL?.trim();
    const from = process.env.CONTACT_FROM_EMAIL?.trim();

    return apiKey && inbox && from ? { apiKey, inbox, from } : null;
  };

export const isEarlyAccessConfigured = (): boolean =>
  readEarlyAccessDeliveryConfig() !== null;

/**
Only publish a direct email address once inbound mail (MX + monitored inbox)
has been verified and explicitly configured for this deployment.
*/
export const getVerifiedContactEmail = (): string | null => {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  return email && email.includes("@") ? email : null;
};

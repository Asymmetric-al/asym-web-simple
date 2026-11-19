/**
Early-access request rules shared by the homepage form and
`POST /api/early-access`, so the browser and the server agree on what a
valid request is.
*/

export const EARLY_ACCESS_LIMITS = {
  email: 254,
  organization: 160,
  message: 2000,
} as const;

/**
Hidden field that people never see; automated submissions fill it in.
*/
export const EARLY_ACCESS_HONEYPOT_FIELD = "website";

export type EarlyAccessField = "email" | "organization" | "message";

export interface EarlyAccessRequest {
  email: string;
  organization: string;
  message: string;
}

export type EarlyAccessErrors = Partial<Record<EarlyAccessField, string>>;

export const earlyAccessCopy = {
  submitting: "Sending your request…",
  success:
    "Thanks. We’ve received your request. We’ll be in touch with launch updates and information about early access.",
  failure: "Your request didn’t go through. Please try again.",
  notConfigured: "Early-access sign-ups aren’t open right now.",
  rateLimited:
    "Too many requests right now. Please wait a few minutes and try again.",
  invalidEmail: "Enter a valid email address.",
  missingOrganization: "Enter your organization’s name.",
  consent:
    "We’ll use your details to reply to you, share launch updates and early access invitations, and understand what nonprofit teams need from asym. To stop hearing from us, reply to any of our emails.",
} as const;

export const formatRetryWait = (retryAfterSeconds?: number): string => {
  if (!retryAfterSeconds || !Number.isFinite(retryAfterSeconds)) {
    return earlyAccessCopy.rateLimited;
  }
  const minutes = Math.max(1, Math.ceil(retryAfterSeconds / 60));
  return minutes === 1
    ? "Too many requests right now. Please wait about a minute and try again."
    : `Too many requests right now. Please wait about ${minutes} minutes and try again.`;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/u;
const WHITESPACE_RUN = /\s+/gu;

const toRecord = (raw: unknown): Record<string, unknown> =>
  typeof raw === "object" && raw !== null
    ? (raw as Record<string, unknown>)
    : {};

const readText = (record: Record<string, unknown>, key: string): string => {
  const value = record[key];
  return typeof value === "string" ? value.trim() : "";
};

const tooLongMessage = (limit: number): string =>
  `Keep this under ${limit.toLocaleString("en-US")} characters.`;

export const isValidEmail = (value: string): boolean =>
  value.length <= EARLY_ACCESS_LIMITS.email && EMAIL_PATTERN.test(value);

/**
Reads untrusted input into trimmed strings without throwing.
*/
export const normalizeEarlyAccessRequest = (
  raw: unknown
): EarlyAccessRequest => {
  const record = toRecord(raw);

  return {
    email: readText(record, "email"),
    organization: readText(record, "organization"),
    message: readText(record, "message"),
  };
};

export const isHoneypotFilled = (raw: unknown): boolean =>
  readText(toRecord(raw), EARLY_ACCESS_HONEYPOT_FIELD).length > 0;

export const validateEarlyAccessRequest = (
  request: EarlyAccessRequest
): EarlyAccessErrors => {
  const errors: EarlyAccessErrors = {};

  if (!isValidEmail(request.email)) {
    errors.email = earlyAccessCopy.invalidEmail;
  }

  if (request.organization.length === 0) {
    errors.organization = earlyAccessCopy.missingOrganization;
  } else if (request.organization.length > EARLY_ACCESS_LIMITS.organization) {
    errors.organization = tooLongMessage(EARLY_ACCESS_LIMITS.organization);
  }

  if (request.message.length > EARLY_ACCESS_LIMITS.message) {
    errors.message = tooLongMessage(EARLY_ACCESS_LIMITS.message);
  }

  return errors;
};

export const hasErrors = (errors: EarlyAccessErrors): boolean =>
  Object.keys(errors).length > 0;

/**
Plain-text notification for the team inbox.
*/
export const buildEarlyAccessNotification = (
  request: EarlyAccessRequest,
  receivedAt: Date
): { subject: string; text: string } => {
  const organization = request.organization.replaceAll(WHITESPACE_RUN, " ");

  return {
    subject: `Early access request: ${organization}`,
    text: [
      "New early access request from asym.app",
      "",
      `Email: ${request.email}`,
      `Organization: ${organization}`,
      `Received: ${receivedAt.toISOString()}`,
      "",
      "What they would like asym to help with:",
      request.message || "(left blank)",
    ].join("\n"),
  };
};

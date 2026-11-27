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

export const EARLY_ACCESS_RATE_LIMIT_WINDOW_SECONDS = 600;

/**
Short-lived HttpOnly cookie attached by `POST /api/early-access` on native
303 redirects to `/early-access/status?state=received`, so standalone visits
cannot spoof a confirmed submission from a query string alone.
*/
export const EARLY_ACCESS_CONFIRMED_COOKIE = "asym_ea_confirmed";

/**
Hidden field that people never see; automated submissions fill it in.
*/
export const EARLY_ACCESS_HONEYPOT_FIELD = "website";

/**
HTML5 `pattern` attribute compatible with Unicode `v`-mode regex compilation.
Matches `isValidEmail()` on both the local part (1-64 allowed chars, no
leading/trailing/consecutive dots) and the domain (at least two dot-separated
ASCII DNS labels of 1-63 alnum/hyphen chars, alnum at both ends).
*/
export const EMAIL_HTML_PATTERN =
  "(?=.{1,64}@)[A-Za-z0-9!#$%&'*+\\/=?^_`\\{\\|\\}~\\-]+(?:\\.[A-Za-z0-9!#$%&'*+\\/=?^_`\\{\\|\\}~\\-]+)*@[A-Za-z0-9](?:[A-Za-z0-9\\-]{0,61}[A-Za-z0-9])?(?:\\.[A-Za-z0-9](?:[A-Za-z0-9\\-]{0,61}[A-Za-z0-9])?)+";

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
    "We’ve received your request and passed it to the Asymmetric.al team. Submitting does not guarantee immediate access; until onboarding opens, you can follow progress on GitHub.",
  failure: "Your request didn’t go through. Please try again.",
  notConfigured: "Early access sign\u{2011}ups aren’t open right now.",
  rateLimited:
    "Too many requests right now. Please wait a few minutes and try again.",
  invalidEmail: "Enter a valid email address.",
  missingOrganization: "Enter your organization’s name.",
  consent:
    "We’ll use your details to reply to you, share launch updates and early access invitations, and understand what missions agencies and nonprofit teams need from asym. To stop hearing from us, reply to any of our emails.",
} as const;

export const parseRetryAfterSeconds = (raw: unknown): number | undefined => {
  const value = typeof raw === "number" ? raw : Number(raw);
  const isValid =
    Number.isFinite(value) &&
    value > 0 &&
    value <= EARLY_ACCESS_RATE_LIMIT_WINDOW_SECONDS;
  return isValid ? Math.ceil(value) : undefined;
};

export const formatRetryWait = (retryAfterSeconds?: number): string => {
  const validSeconds = parseRetryAfterSeconds(retryAfterSeconds);
  if (validSeconds === undefined) {
    return earlyAccessCopy.rateLimited;
  }
  const minutes = Math.max(1, Math.ceil(validSeconds / 60));
  return minutes === 1
    ? "Too many requests right now. Please wait about a minute and try again."
    : `Too many requests right now. Please wait about ${minutes} minutes and try again.`;
};

const LOCAL_PART_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/u;
const DOMAIN_LABEL_PATTERN =
  /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/u;
const WHITESPACE_RUN = /\s+/gu;
const MAX_LOCAL_LENGTH = 64;
const MAX_DOMAIN_LENGTH = 253;

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

/**
Accepts one trimmed bare email address (<= 254 chars) with a browser-compatible
local part (allowing `+`) and at least two dot-separated ASCII DNS labels
(1-63 letters, digits, or hyphens, with a letter or digit at both ends).
*/
const hasValidLocalPart = (local: string): boolean => {
  const hasValidLength = local.length > 0 && local.length <= MAX_LOCAL_LENGTH;
  const hasInvalidDots =
    local.startsWith(".") || local.endsWith(".") || local.includes("..");
  return hasValidLength && !hasInvalidDots && LOCAL_PART_PATTERN.test(local);
};

export const isValidEmail = (value: string): boolean => {
  if (
    value.length === 0 ||
    value.length > EARLY_ACCESS_LIMITS.email ||
    value !== value.trim()
  ) {
    return false;
  }

  const atIndex = value.indexOf("@");
  if (atIndex <= 0 || atIndex !== value.lastIndexOf("@")) {
    return false;
  }

  const local = value.slice(0, atIndex);
  const domain = value.slice(atIndex + 1);
  if (domain.length > MAX_DOMAIN_LENGTH || !hasValidLocalPart(local)) {
    return false;
  }

  const labels = domain.split(".");
  if (labels.length < 2) {
    return false;
  }

  for (const label of labels) {
    if (!DOMAIN_LABEL_PATTERN.test(label)) {
      return false;
    }
  }

  return true;
};

/**
Validates an outbound sender header in either `address@domain.tld` or `Display Name <address@domain.tld>` format.
*/
export const isValidSenderAddress = (value: string): boolean => {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return false;
  }
  const openIndex = trimmed.indexOf("<");
  if (openIndex === -1) {
    return !trimmed.includes(">") && isValidEmail(trimmed);
  }
  const closeIndex = trimmed.indexOf(">");
  const hasValidBrackets =
    openIndex > 0 &&
    closeIndex === trimmed.length - 1 &&
    trimmed.lastIndexOf("<") === openIndex;
  return (
    hasValidBrackets &&
    isValidEmail(trimmed.slice(openIndex + 1, closeIndex).trim())
  );
};

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

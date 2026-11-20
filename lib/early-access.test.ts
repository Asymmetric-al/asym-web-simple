import { describe, expect, it } from "vitest";
import {
  EARLY_ACCESS_LIMITS,
  EARLY_ACCESS_RATE_LIMIT_WINDOW_SECONDS,
  EMAIL_HTML_PATTERN,
  buildEarlyAccessNotification,
  earlyAccessCopy,
  formatRetryWait,
  hasErrors,
  isHoneypotFilled,
  isValidEmail,
  isValidSenderAddress,
  normalizeEarlyAccessRequest,
  parseRetryAfterSeconds,
  validateEarlyAccessRequest,
} from "./early-access";
import {
  isEarlyAccessConfigured,
  readEarlyAccessDeliveryConfig,
} from "./early-access-config";

const validRequest = {
  email: "director@example.org",
  organization: "Example Missions",
  message: "",
};

describe("isValidEmail", () => {
  it("accepts ordinary and plus-addressed domains with valid DNS labels", () => {
    expect(isValidEmail("director@example.org")).toBeTruthy();
    expect(isValidEmail("first.last+tag@mail.example.co.uk")).toBeTruthy();
    expect(isValidEmail("ops+appeals@north-field.example.org")).toBeTruthy();
    expect(isValidEmail("a@x.io")).toBeTruthy();
    expect(isValidEmail("hello@example.invalid")).toBeTruthy();
  });

  it("rejects addresses with malformed domain labels, missing dots, or whitespace", () => {
    expect(isValidEmail("")).toBeFalsy();
    expect(isValidEmail("director")).toBeFalsy();
    expect(isValidEmail("director@example")).toBeFalsy();
    expect(isValidEmail("hello@localhost")).toBeFalsy();
    expect(isValidEmail("director@.org")).toBeFalsy();
    expect(isValidEmail("hello@-invalid.org")).toBeFalsy();
    expect(isValidEmail("hello@invalid-.org")).toBeFalsy();
    expect(isValidEmail("hello@bad_domain.org")).toBeFalsy();
    expect(isValidEmail("hello@a..org")).toBeFalsy();
    expect(isValidEmail(".lead@example.org")).toBeFalsy();
    expect(isValidEmail("a..b@example.org")).toBeFalsy();
    expect(isValidEmail("dir ector@example.org")).toBeFalsy();
    expect(isValidEmail(" director@example.org ")).toBeFalsy();
  });

  it("rejects addresses over the length limits", () => {
    const local = "a".repeat(EARLY_ACCESS_LIMITS.email);
    const overLocal = "a".repeat(65);
    const overLabel = "b".repeat(64);

    expect(isValidEmail(`${local}@example.org`)).toBeFalsy();
    expect(isValidEmail(`${overLocal}@example.org`)).toBeFalsy();
    expect(isValidEmail(`director@${overLabel}.org`)).toBeFalsy();
  });

  it("keeps EMAIL_HTML_PATTERN in strict v-mode parity with isValidEmail", () => {
    const htmlRegex = new RegExp(`^(?:${EMAIL_HTML_PATTERN})$`, "v");
    const samples = [
      "director@example.org",
      "first.last+tag@mail.example.co.uk",
      `${"a".repeat(64)}@example.org`,
      `${"a".repeat(65)}@example.org`,
      "sam..lee@example.org",
      "sam.@example.org",
      ".sam@example.org",
      "hello@localhost",
      "hello@-invalid.org",
      "hello@invalid-.org",
      "hello@bad_domain.org",
      "hello@a..org",
    ];

    for (const sample of samples) {
      expect(htmlRegex.test(sample)).toBe(isValidEmail(sample));
    }
  });
});

describe("isValidSenderAddress", () => {
  it("accepts bare and Display Name <mailbox> sender formats", () => {
    expect(isValidSenderAddress("from@example.invalid")).toBeTruthy();
    expect(isValidSenderAddress("asym <from@example.invalid>")).toBeTruthy();
  });

  it("rejects malformed sender mailboxes", () => {
    expect(isValidSenderAddress("")).toBeFalsy();
    expect(isValidSenderAddress("asym <from@-invalid.org>")).toBeFalsy();
    expect(isValidSenderAddress("asym <bad_domain>")).toBeFalsy();
  });
});

describe("normalizeEarlyAccessRequest", () => {
  it("trims strings and ignores non-string values", () => {
    expect(
      normalizeEarlyAccessRequest({
        email: "  director@example.org ",
        organization: 42,
        message: "  Year-end receipts  ",
      })
    ).toStrictEqual({
      email: "director@example.org",
      organization: "",
      message: "Year-end receipts",
    });
  });

  it("returns empty fields for non-object input", () => {
    expect(normalizeEarlyAccessRequest(null)).toStrictEqual({
      email: "",
      organization: "",
      message: "",
    });
    expect(normalizeEarlyAccessRequest("email=x")).toStrictEqual({
      email: "",
      organization: "",
      message: "",
    });
  });
});

describe("validateEarlyAccessRequest", () => {
  it("accepts a request with an empty optional message", () => {
    expect(hasErrors(validateEarlyAccessRequest(validRequest))).toBeFalsy();
  });

  it("reports the invalid email and missing organization together", () => {
    expect(
      validateEarlyAccessRequest({
        email: "hello@-invalid.org",
        organization: "",
        message: "",
      })
    ).toStrictEqual({
      email: earlyAccessCopy.invalidEmail,
      organization: earlyAccessCopy.missingOrganization,
    });
  });

  it("limits the organization and message length", () => {
    const errors = validateEarlyAccessRequest({
      ...validRequest,
      organization: "o".repeat(EARLY_ACCESS_LIMITS.organization + 1),
      message: "m".repeat(EARLY_ACCESS_LIMITS.message + 1),
    });

    expect(errors.organization).toMatch(/under 160 characters/u);
    expect(errors.message).toMatch(/under 2,000 characters/u);
  });
});

describe("isHoneypotFilled", () => {
  it("flags submissions that fill the hidden field", () => {
    expect(isHoneypotFilled({ website: "https://spam.example" })).toBeTruthy();
  });

  it("ignores blank or missing hidden fields", () => {
    expect(isHoneypotFilled({ website: " ".repeat(3) })).toBeFalsy();
    expect(isHoneypotFilled({})).toBeFalsy();
    expect(isHoneypotFilled(undefined)).toBeFalsy();
  });
});

describe("buildEarlyAccessNotification", () => {
  it("keeps the subject on one line and includes every field", () => {
    const notification = buildEarlyAccessNotification(
      {
        email: "director@example.org",
        organization: "Example\r\nMissions",
        message: "Receipts and recurring gifts",
      },
      new Date("2026-11-19T12:00:00.000Z")
    );

    expect(notification.subject).toBe("Early access request: Example Missions");
    expect(notification.text).toContain("Email: director@example.org");
    expect(notification.text).toContain("Organization: Example Missions");
    expect(notification.text).toContain("Received: 2026-11-19T12:00:00.000Z");
    expect(notification.text).toContain("Receipts and recurring gifts");
  });

  it("marks a blank message instead of leaving an empty line", () => {
    const notification = buildEarlyAccessNotification(
      validRequest,
      new Date("2026-11-19T12:00:00.000Z")
    );

    expect(notification.text).toContain("(left blank)");
  });
});

describe("parseRetryAfterSeconds and formatRetryWait", () => {
  it("clamps retry durations strictly to the rate-limit window", () => {
    expect(parseRetryAfterSeconds(45)).toBe(45);
    expect(parseRetryAfterSeconds(EARLY_ACCESS_RATE_LIMIT_WINDOW_SECONDS)).toBe(
      EARLY_ACCESS_RATE_LIMIT_WINDOW_SECONDS
    );
    expect(parseRetryAfterSeconds(0)).toBeUndefined();
    expect(parseRetryAfterSeconds(-10)).toBeUndefined();
    expect(parseRetryAfterSeconds(99_999_999)).toBeUndefined();
    expect(parseRetryAfterSeconds("not-a-number")).toBeUndefined();
  });

  it("rounds retry durations honestly to minutes and falls back when out of range", () => {
    expect(formatRetryWait(45)).toContain("about a minute");
    expect(formatRetryWait(540)).toContain("about 9 minutes");
    expect(formatRetryWait(99_999_999)).toBe(earlyAccessCopy.rateLimited);
    expect(formatRetryWait(undefined)).toBe(earlyAccessCopy.rateLimited);
  });
});

describe("readEarlyAccessDeliveryConfig", () => {
  it("requires valid outbound Resend credentials and a verified private contact email", () => {
    const prev = {
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      CONTACT_INBOX_EMAIL: process.env.CONTACT_INBOX_EMAIL,
      CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
      NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    };

    try {
      process.env.RESEND_API_KEY = "re_test_key";
      process.env.CONTACT_INBOX_EMAIL = "inbox@example.invalid";
      process.env.CONTACT_FROM_EMAIL = "asym <from@example.invalid>";
      delete process.env.NEXT_PUBLIC_CONTACT_EMAIL;

      expect(readEarlyAccessDeliveryConfig()).toBeNull();
      expect(isEarlyAccessConfigured()).toBeFalsy();

      for (const badEmail of [
        "@",
        "not-an-email",
        "hello@localhost",
        "hello@-invalid.org",
        "hello@invalid-.org",
        "hello@bad_domain.org",
      ]) {
        process.env.NEXT_PUBLIC_CONTACT_EMAIL = badEmail;
        expect(readEarlyAccessDeliveryConfig()).toBeNull();
        expect(isEarlyAccessConfigured()).toBeFalsy();
      }

      process.env.NEXT_PUBLIC_CONTACT_EMAIL = "hello@example.invalid";
      expect(readEarlyAccessDeliveryConfig()).toStrictEqual({
        apiKey: "re_test_key",
        inbox: "inbox@example.invalid",
        from: "asym <from@example.invalid>",
        contactEmail: "hello@example.invalid",
      });
      expect(isEarlyAccessConfigured()).toBeTruthy();

      process.env.CONTACT_FROM_EMAIL = "asym <from@-invalid.org>";
      expect(readEarlyAccessDeliveryConfig()).toBeNull();
    } finally {
      for (const [key, val] of Object.entries(prev)) {
        if (val === undefined) {
          delete process.env[key];
        } else {
          process.env[key] = val;
        }
      }
    }
  });
});

import { describe, expect, it } from "vitest";
import {
  EARLY_ACCESS_LIMITS,
  buildEarlyAccessNotification,
  earlyAccessCopy,
  formatRetryWait,
  hasErrors,
  isHoneypotFilled,
  isValidEmail,
  normalizeEarlyAccessRequest,
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
  it("accepts ordinary addresses", () => {
    expect(isValidEmail("director@example.org")).toBeTruthy();
    expect(isValidEmail("first.last+tag@mail.example.co.uk")).toBeTruthy();
  });

  it("rejects addresses without a domain, a dot, or with spaces", () => {
    expect(isValidEmail("")).toBeFalsy();
    expect(isValidEmail("director")).toBeFalsy();
    expect(isValidEmail("director@example")).toBeFalsy();
    expect(isValidEmail("director@.org")).toBeFalsy();
    expect(isValidEmail("dir ector@example.org")).toBeFalsy();
  });

  it("rejects addresses over the length limit", () => {
    const local = "a".repeat(EARLY_ACCESS_LIMITS.email);

    expect(isValidEmail(`${local}@example.org`)).toBeFalsy();
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
        email: "not-an-email",
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

describe("formatRetryWait", () => {
  it("rounds retry durations honestly to minutes", () => {
    expect(formatRetryWait(45)).toContain("about a minute");
    expect(formatRetryWait(540)).toContain("about 9 minutes");
    expect(formatRetryWait(undefined)).toBe(earlyAccessCopy.rateLimited);
  });
});

describe("readEarlyAccessDeliveryConfig", () => {
  it("requires outbound Resend credentials and a verified private contact email", () => {
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

      process.env.NEXT_PUBLIC_CONTACT_EMAIL = "hello@example.invalid";
      expect(readEarlyAccessDeliveryConfig()).toStrictEqual({
        apiKey: "re_test_key",
        inbox: "inbox@example.invalid",
        from: "asym <from@example.invalid>",
        contactEmail: "hello@example.invalid",
      });
      expect(isEarlyAccessConfigured()).toBeTruthy();
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

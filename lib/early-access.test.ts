import { describe, expect, it } from "vitest";
import {
  EARLY_ACCESS_LIMITS,
  buildEarlyAccessNotification,
  earlyAccessCopy,
  hasErrors,
  isHoneypotFilled,
  isValidEmail,
  normalizeEarlyAccessRequest,
  validateEarlyAccessRequest,
} from "./early-access";

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

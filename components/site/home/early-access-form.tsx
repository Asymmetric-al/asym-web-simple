"use client";

import { ArrowRight, CircleCheck, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/config";
import {
  EARLY_ACCESS_HONEYPOT_FIELD,
  EARLY_ACCESS_LIMITS,
  earlyAccessCopy,
  hasErrors,
  normalizeEarlyAccessRequest,
  validateEarlyAccessRequest,
} from "@/lib/early-access";
import { cn } from "@/lib/utils";
import type {
  EarlyAccessErrors,
  EarlyAccessField,
  EarlyAccessRequest,
} from "@/lib/early-access";
import type { ReactNode, SubmitEvent } from "react";

const formStatuses = ["idle", "submitting", "success", "failure"] as const;

type SubmitResult =
  | { kind: "accepted" }
  | { kind: "invalid"; errors: EarlyAccessErrors }
  | { kind: "failed" };

const FIELD_ORDER: readonly EarlyAccessField[] = [
  "email",
  "organization",
  "message",
];

const errorFor = (
  errors: EarlyAccessErrors,
  field: EarlyAccessField
): string | undefined => errors[field];

const withoutError = (
  errors: EarlyAccessErrors,
  field: EarlyAccessField
): EarlyAccessErrors =>
  Object.fromEntries(
    Object.entries(errors).filter(([key]) => key !== field)
  ) as EarlyAccessErrors;

const readServerErrors = (payload: unknown): EarlyAccessErrors => {
  if (typeof payload !== "object" || payload === null) {
    return {};
  }
  const { errors } = payload as { errors?: unknown };
  return typeof errors !== "object" || errors === null
    ? {}
    : (errors as EarlyAccessErrors);
};

const postEarlyAccess = async (body: string): Promise<Response | null> => {
  try {
    return await fetch("/api/early-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
  } catch {
    return null;
  }
};

const readJson = async (response: Response): Promise<unknown> => {
  try {
    return (await response.json()) as unknown;
  } catch {
    return null;
  }
};

const VALIDATION_FAILED = 422;

const submitEarlyAccess = async (
  request: EarlyAccessRequest,
  honeypot: string
): Promise<SubmitResult> => {
  const response = await postEarlyAccess(
    JSON.stringify({ ...request, [EARLY_ACCESS_HONEYPOT_FIELD]: honeypot })
  );

  if (response?.ok) {
    return { kind: "accepted" };
  }
  if (response?.status !== VALIDATION_FAILED) {
    return { kind: "failed" };
  }

  const errors = readServerErrors(await readJson(response));
  return hasErrors(errors) ? { kind: "invalid", errors } : { kind: "failed" };
};

const FieldMessage = ({
  id,
  children,
}: {
  readonly id: string;
  readonly children: string | undefined;
}): ReactNode => {
  if (!children) {
    return null;
  }
  return (
    <p id={id} className="text-destructive mt-2 text-sm leading-5">
      {children}
    </p>
  );
};

export const EarlyAccessForm = (): ReactNode => {
  const formId = useId();
  const ids = {
    email: `${formId}-email`,
    organization: `${formId}-organization`,
    message: `${formId}-message`,
    honeypot: `${formId}-website`,
    consent: `${formId}-consent`,
  };
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const [status, setStatus] = useState<(typeof formStatuses)[number]>(
    formStatuses[0]
  );
  const [errors, setErrors] = useState<EarlyAccessErrors>({});
  const isSubmitting = status === "submitting";

  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
    }
  }, [status]);

  if (status === "success") {
    return (
      <div className="border-foreground/10 bg-card rounded-[1.6rem] border p-6 sm:p-8">
        <CircleCheck className="text-primary size-7" aria-hidden="true" />
        <h3
          ref={successRef}
          tabIndex={-1}
          className="font-heading text-foreground focus-visible:ring-ring/45 mt-4 rounded-sm text-2xl font-semibold tracking-[-0.04em] focus-visible:ring-[3px] focus-visible:outline-none"
        >
          Request received
        </h3>
        <p
          className="text-muted-foreground mt-2 text-base leading-7"
          role="status"
        >
          {earlyAccessCopy.success}
        </p>
      </div>
    );
  }

  const focusFirstInvalid = (fieldErrors: EarlyAccessErrors) => {
    const first = FIELD_ORDER.find(
      (field) => errorFor(fieldErrors, field) !== undefined
    );
    if (first) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${CSS.escape(first)}"]`)
        ?.focus();
    }
  };

  const clearError = (field: EarlyAccessField) => {
    setErrors((current) =>
      errorFor(current, field) === undefined
        ? current
        : withoutError(current, field)
    );
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const request = normalizeEarlyAccessRequest(Object.fromEntries(formData));
    const fieldErrors = validateEarlyAccessRequest(request);
    setErrors(fieldErrors);

    if (hasErrors(fieldErrors)) {
      setStatus("idle");
      focusFirstInvalid(fieldErrors);
      return;
    }

    setStatus("submitting");
    const honeypot = String(formData.get(EARLY_ACCESS_HONEYPOT_FIELD) ?? "");
    const result = await submitEarlyAccess(request, honeypot);

    if (result.kind === "accepted") {
      setStatus("success");
      return;
    }
    if (result.kind === "invalid") {
      setErrors(result.errors);
      setStatus("idle");
      focusFirstInvalid(result.errors);
      return;
    }
    setStatus("failure");
  };

  const describedBy = (field: EarlyAccessField): string | undefined =>
    errorFor(errors, field) === undefined ? undefined : `${ids[field]}-error`;

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-label="Request early access"
      className="border-foreground/10 bg-card relative rounded-[1.6rem] border p-5 sm:p-7"
    >
      <p className="sr-only" role="status" aria-live="polite">
        {isSubmitting ? earlyAccessCopy.submitting : ""}
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={ids.email}>Email</Label>
          <Input
            id={ids.email}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={EARLY_ACCESS_LIMITS.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            onChange={() => clearError("email")}
            className="mt-2"
          />
          <FieldMessage id={`${ids.email}-error`}>{errors.email}</FieldMessage>
        </div>
        <div>
          <Label htmlFor={ids.organization}>Organization</Label>
          <Input
            id={ids.organization}
            name="organization"
            type="text"
            autoComplete="organization"
            required
            maxLength={EARLY_ACCESS_LIMITS.organization}
            aria-invalid={Boolean(errors.organization)}
            aria-describedby={describedBy("organization")}
            onChange={() => clearError("organization")}
            className="mt-2"
          />
          <FieldMessage id={`${ids.organization}-error`}>
            {errors.organization}
          </FieldMessage>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor={ids.message}>
            What would you like asym to help with?
            <span className="text-muted-foreground font-normal">
              (optional)
            </span>
          </Label>
          <Textarea
            id={ids.message}
            name="message"
            rows={4}
            maxLength={EARLY_ACCESS_LIMITS.message}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message")}
            onChange={() => clearError("message")}
            placeholder="For example: year-end appeals, recurring gifts, receipts, or our website"
            className="mt-2 min-h-28"
          />
          <FieldMessage id={`${ids.message}-error`}>
            {errors.message}
          </FieldMessage>
        </div>
      </div>

      <div
        className="absolute -left-[9999px] size-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor={ids.honeypot}>Leave this field empty</label>
        <input
          id={ids.honeypot}
          name={EARLY_ACCESS_HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "failure" ? (
        <div
          role="alert"
          className="border-destructive/25 bg-destructive/8 text-foreground mt-5 rounded-2xl border px-4 py-3 text-sm leading-6"
        >
          <p className="font-medium">{earlyAccessCopy.failure}</p>
          <p className="text-muted-foreground">
            Your entries are still here. You can also email{" "}
            <a
              href={`mailto:${siteConfig.email}?subject=asym%20early%20access`}
              className="text-foreground link-resilient underline underline-offset-4"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="lg"
          aria-disabled={isSubmitting}
          aria-describedby={ids.consent}
          className={cn("px-6", isSubmitting && "cursor-progress")}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              {earlyAccessCopy.submitting}
            </>
          ) : (
            <>
              Request early access
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
      <p
        id={ids.consent}
        className="text-muted-foreground mt-4 text-xs leading-5 sm:text-sm sm:leading-6"
      >
        We’ll use your details only to contact you about asym and early access.
        To stop hearing from us, reply to any of our emails. Read our{" "}
        <Link
          href="/privacy"
          className="text-foreground underline underline-offset-4"
        >
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
};

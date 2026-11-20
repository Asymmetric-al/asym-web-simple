"use client";

import { ArrowRight, ArrowUpRight, CircleCheck, Loader2 } from "lucide-react";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { buttonVariants } from "@/components/ui/button-variants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/config";
import {
  EARLY_ACCESS_HONEYPOT_FIELD,
  EARLY_ACCESS_LIMITS,
  EMAIL_HTML_PATTERN,
  earlyAccessCopy,
  formatRetryWait,
  hasErrors,
  normalizeEarlyAccessRequest,
  parseRetryAfterSeconds,
  validateEarlyAccessRequest,
} from "@/lib/early-access";
import { cn } from "@/lib/utils";
import type {
  EarlyAccessErrors,
  EarlyAccessField,
  EarlyAccessRequest,
} from "@/lib/early-access";
import type { ReactNode, SubmitEvent } from "react";

type FormStatus =
  | "idle"
  | "submitting"
  | "success"
  | "failure"
  | "not_configured"
  | "rate_limited";

type SubmitResult =
  | { kind: "accepted" }
  | { kind: "invalid"; errors: EarlyAccessErrors }
  | { kind: "not_configured" }
  | { kind: "rate_limited"; retryAfterSeconds?: number }
  | { kind: "failed" };

const FIELD_ORDER: readonly EarlyAccessField[] = [
  "email",
  "organization",
  "message",
];

const DRAFT_STORAGE_KEY = "asym:early-access-draft:v1";
const VALIDATION_FAILED = 422;
const RATE_LIMITED = 429;
const NOT_CONFIGURED = 503;

const noop = () => {
  // Static subscription for client hydration flag.
};

const emptySubscribe = () => noop;

const useIsClient = (): boolean =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

const readStoredDraft = (): Partial<EarlyAccessRequest> | null => {
  try {
    const raw = window.sessionStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== "object" || parsed === null) {
      return null;
    }
    const record = parsed as Record<string, unknown>;
    return {
      email: typeof record.email === "string" ? record.email : "",
      organization:
        typeof record.organization === "string" ? record.organization : "",
      message: typeof record.message === "string" ? record.message : "",
    };
  } catch {
    return null;
  }
};

const writeStoredDraft = (draft: EarlyAccessRequest) => {
  try {
    if (
      draft.email.length === 0 &&
      draft.organization.length === 0 &&
      draft.message.length === 0
    ) {
      window.sessionStorage.removeItem(DRAFT_STORAGE_KEY);
      return;
    }
    window.sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Ignore restricted sessionStorage environments.
  }
};

const clearStoredDraft = () => {
  try {
    window.sessionStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch {
    // Ignore restricted sessionStorage environments.
  }
};

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

const readRetryAfter = (
  response: Response,
  payload: unknown
): number | undefined => {
  if (typeof payload === "object" && payload !== null) {
    const { retryAfterSeconds } = payload as { retryAfterSeconds?: unknown };
    const parsed = parseRetryAfterSeconds(retryAfterSeconds);
    if (parsed !== undefined) {
      return parsed;
    }
  }
  return parseRetryAfterSeconds(response.headers.get("retry-after") ?? "");
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
  if (response?.status === NOT_CONFIGURED) {
    return { kind: "not_configured" };
  }
  if (response?.status === RATE_LIMITED) {
    const payload = await readJson(response);
    const retryAfterSeconds = readRetryAfter(response, payload);
    return retryAfterSeconds === undefined
      ? { kind: "rate_limited" }
      : { kind: "rate_limited", retryAfterSeconds };
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

const inlineLinkClassName =
  "text-foreground hover:text-primary focus-visible:ring-ring focus-visible:ring-offset-background link-resilient rounded-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent";

export const EarlyAccessForm = ({
  contactEmail,
}: {
  readonly contactEmail?: string | null;
}): ReactNode => {
  const isHydrated = useIsClient();
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

  const [status, setStatus] = useState<FormStatus>("idle");
  const [retrySeconds, setRetrySeconds] = useState<number | undefined>();
  const [errors, setErrors] = useState<EarlyAccessErrors>({});
  const isSubmitting = status === "submitting";

  useEffect(() => {
    const form = formRef.current;
    if (!form) {
      return;
    }
    const draft = readStoredDraft();
    if (!draft) {
      return;
    }
    for (const field of FIELD_ORDER) {
      const control = form.elements.namedItem(field);
      const savedValue = draft[field];
      if (
        (control instanceof HTMLInputElement ||
          control instanceof HTMLTextAreaElement) &&
        control.value.length === 0 &&
        savedValue &&
        savedValue.length > 0
      ) {
        control.value = savedValue;
      }
    }
  }, []);

  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
    }
  }, [status]);

  if (status === "success") {
    return (
      <div className="surface-enter border-foreground/12 bg-card rounded-[1.6rem] border p-6 sm:p-8">
        <CircleCheck className="text-primary size-7" aria-hidden="true" />
        <h3
          ref={successRef}
          tabIndex={-1}
          className="font-heading text-foreground focus-visible:ring-ring focus-visible:ring-offset-background mt-4 rounded-[0.375rem] text-2xl font-semibold tracking-[-0.025em] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent"
        >
          Request received
        </h3>
        <p
          className="text-muted-foreground mt-2 text-base leading-7"
          role="status"
        >
          {earlyAccessCopy.success}
        </p>
        <div className="mt-6">
          <a
            href={siteConfig.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center gap-1.5 rounded-[0.375rem] text-sm font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-9"
          >
            Follow development on GitHub
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>
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

  const handleDraftInput = () => {
    const form = formRef.current;
    if (!form) {
      return;
    }
    const formData = new FormData(form);
    writeStoredDraft({
      email: String(formData.get("email") ?? ""),
      organization: String(formData.get("organization") ?? ""),
      message: String(formData.get("message") ?? ""),
    });
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
      clearStoredDraft();
      setStatus("success");
      return;
    }
    if (result.kind === "invalid") {
      setErrors(result.errors);
      setStatus("idle");
      focusFirstInvalid(result.errors);
      return;
    }
    if (result.kind === "not_configured") {
      setStatus("not_configured");
      return;
    }
    if (result.kind === "rate_limited") {
      setRetrySeconds(result.retryAfterSeconds);
      setStatus("rate_limited");
      return;
    }
    setStatus("failure");
  };

  const describedBy = (field: EarlyAccessField): string | undefined =>
    errorFor(errors, field) === undefined ? undefined : `${ids[field]}-error`;

  const hasAlert = ["failure", "not_configured", "rate_limited"].includes(
    status
  );

  let alertHeading: string = earlyAccessCopy.failure;
  if (status === "not_configured") {
    alertHeading = earlyAccessCopy.notConfigured;
  } else if (status === "rate_limited") {
    alertHeading = formatRetryWait(retrySeconds);
  }

  return (
    <form
      ref={formRef}
      method="post"
      action="/api/early-access"
      noValidate={isHydrated}
      onInput={handleDraftInput}
      onSubmit={handleSubmit}
      aria-label="Request early access"
      className="sm:border-foreground/12 sm:bg-card relative sm:rounded-[1.6rem] sm:border sm:p-7"
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
            autoCapitalize="none"
            spellCheck={false}
            required
            pattern={EMAIL_HTML_PATTERN}
            title={earlyAccessCopy.invalidEmail}
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
            pattern=".*\S.*"
            title={earlyAccessCopy.missingOrganization}
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
          <Label htmlFor={ids.message} className="block leading-6">
            <span>
              What would you like <span translate="no">asym</span> to help with?
            </span>{" "}
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
            placeholder="For example: year-end appeals, recurring gifts, receipts, or our website…"
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

      {hasAlert ? (
        <div
          role="alert"
          className="border-destructive/30 bg-destructive/8 text-foreground mt-5 rounded-2xl border px-4 py-3 text-sm leading-6"
        >
          <p className="font-medium">{alertHeading}</p>
          <p className="text-muted-foreground mt-1">
            Your entries are still here.{" "}
            {contactEmail ? (
              <>
                You can also email{" "}
                <a
                  href={`mailto:${contactEmail}?subject=asym%20early%20access`}
                  className={inlineLinkClassName}
                >
                  {contactEmail}
                </a>
                .
              </>
            ) : (
              <>
                You can follow development on{" "}
                <a
                  href={siteConfig.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={inlineLinkClassName}
                >
                  GitHub
                </a>
                .
              </>
            )}
          </p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          aria-disabled={isSubmitting}
          aria-describedby={ids.consent}
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full px-6 sm:w-auto sm:min-w-[15.5rem]",
            isSubmitting && "cursor-progress"
          )}
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
        </button>
      </div>
      <p
        id={ids.consent}
        className="text-muted-foreground mt-4 text-xs leading-5 sm:text-sm sm:leading-6"
      >
        {earlyAccessCopy.consent} Read our{" "}
        <a
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            inlineLinkClassName,
            "inline-flex items-baseline gap-0.5"
          )}
        >
          Privacy policy (opens in a new tab)
          <ArrowUpRight
            className="size-3 shrink-0 self-center"
            aria-hidden="true"
          />
        </a>
        .
      </p>
    </form>
  );
};

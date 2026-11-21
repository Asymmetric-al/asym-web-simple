"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CircleCheckIcon,
} from "@/components/site/icons";
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
import { useIsClient } from "@/lib/use-is-client";
import { cn } from "@/lib/utils";
import type {
  EarlyAccessErrors,
  EarlyAccessField,
  EarlyAccessRequest,
} from "@/lib/early-access";
import type { ReactNode, SubmitEvent } from "react";

const SpinnerIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="size-4 animate-spin"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

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

const parseDraftObject = (raw: string): Partial<EarlyAccessRequest> | null => {
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
};

const loadStoredDraftFromSession = (): Partial<EarlyAccessRequest> | null => {
  const raw = window.sessionStorage.getItem(DRAFT_STORAGE_KEY);
  return raw ? parseDraftObject(raw) : null;
};

const readStoredDraft = (): Partial<EarlyAccessRequest> | null => {
  try {
    return loadStoredDraftFromSession();
  } catch {
    return null;
  }
};

const saveDraftToStorage = (draft: EarlyAccessRequest) => {
  const isEmpty =
    draft.email.length === 0 &&
    draft.organization.length === 0 &&
    draft.message.length === 0;
  if (isEmpty) {
    window.sessionStorage.removeItem(DRAFT_STORAGE_KEY);
    return;
  }
  window.sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
};

const writeStoredDraft = (draft: EarlyAccessRequest) => {
  try {
    saveDraftToStorage(draft);
  } catch {
    // Ignore restricted sessionStorage environments.
  }
};

const EarlyAccessSuccessCard = ({
  successRef,
}: {
  readonly successRef: React.RefObject<HTMLHeadingElement | null>;
}): ReactNode => (
  <div className="surface-enter border-rule-strong bg-background/70 relative rounded-xl border p-6 sm:p-8">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <CircleCheckIcon className="text-signal size-7" />
      <span className="border-signal-border bg-signal-soft text-signal inline-block rounded-md border px-2.5 py-1 font-mono text-xs font-medium tracking-[0.06em] uppercase">
        Received
      </span>
    </div>
    <h3
      ref={successRef}
      tabIndex={-1}
      className="font-heading text-foreground focus-visible:ring-ring focus-visible:ring-offset-background mt-4 rounded-md text-2xl font-semibold tracking-[-0.025em] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent"
    >
      Request received
    </h3>
    <p className="text-muted-foreground mt-2 text-base leading-7" role="status">
      {earlyAccessCopy.success}
    </p>
    <div className="mt-6">
      <a
        href={`${siteConfig.repoUrl}#readme`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-9 [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
      >
        Follow development on GitHub
        <span className="sr-only"> (opens in a new tab)</span>
        <ArrowUpRightIcon className="size-3.5" />
      </a>
    </div>
  </div>
);

const isEditableControl = (
  control: Element | RadioNodeList | null
): control is HTMLInputElement | HTMLTextAreaElement =>
  control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement;

const inlineLinkClassName =
  "text-foreground focus-visible:ring-ring focus-visible:ring-offset-background link-resilient rounded-xs underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-primary";

const TRANSIENT_ALERT_STATUSES: Record<string, true> = {
  failure: true,
  rate_limited: true,
  not_configured: true,
};

const EarlyAccessAlertBanner = ({
  status,
  alertHeading,
  contactEmail,
}: {
  readonly status: string;
  readonly alertHeading: string;
  readonly contactEmail: string | null | undefined;
}): ReactNode => (
  <div
    role="alert"
    className={cn(
      "text-foreground mt-5 border px-4 py-3 text-sm leading-6",
      status === "not_configured"
        ? "border-rule bg-record/85"
        : "border-destructive-border bg-destructive/8"
    )}
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
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </>
      )}
    </p>
  </div>
);

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

const isAcceptedPayload = (payload: unknown): boolean =>
  typeof payload === "object" &&
  payload !== null &&
  (payload as { ok?: unknown }).ok === true;

const submitEarlyAccess = async (
  request: EarlyAccessRequest,
  honeypot: string
): Promise<SubmitResult> => {
  const response = await postEarlyAccess(
    JSON.stringify({ ...request, [EARLY_ACCESS_HONEYPOT_FIELD]: honeypot })
  );

  if (response?.ok) {
    const payload = await readJson(response);
    return { kind: isAcceptedPayload(payload) ? "accepted" : "failed" };
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
    <p
      id={id}
      className="text-destructive mt-2 flex items-center gap-1.5 text-sm leading-5 font-medium"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-3.5 shrink-0"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
      <span>{children}</span>
    </p>
  );
};

const EarlyAccessFormFooter = ({
  consentId,
  isSubmitting,
}: {
  readonly consentId: string;
  readonly isSubmitting: boolean;
}): ReactNode => (
  <>
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="submit"
        aria-disabled={isSubmitting}
        aria-describedby={consentId}
        className={cn(
          buttonVariants({ size: "lg" }),
          "w-full px-6 sm:w-auto sm:min-w-[15.5rem]",
          isSubmitting && "cursor-progress"
        )}
      >
        {isSubmitting ? (
          <>
            <SpinnerIcon />
            {earlyAccessCopy.submitting}
          </>
        ) : (
          <>
            Request early access
            <ArrowRightIcon dataIcon="inline-end" />
          </>
        )}
      </button>
    </div>
    <p
      id={consentId}
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
        Privacy policy
        <span className="sr-only"> (opens in a new tab)</span>
        <ArrowUpRightIcon className="size-3 shrink-0 self-center" />
      </a>
      .
    </p>
  </>
);

export const EarlyAccessForm = ({
  contactEmail,
  onSuccess,
}: {
  readonly contactEmail?: string | null;
  readonly onSuccess?: () => void;
}): ReactNode => {
  type FormStatus =
    | "idle"
    | "submitting"
    | "success"
    | "failure"
    | "not_configured"
    | "rate_limited";
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
  const submittingRef = useRef(false);

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
      if (savedValue && isEditableControl(control) && control.value === "") {
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
    return <EarlyAccessSuccessCard successRef={successRef} />;
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

  const clearTransientAlert = () => {
    setStatus((current) =>
      Object.hasOwn(TRANSIENT_ALERT_STATUSES, current) ? "idle" : current
    );
  };

  const clearError = (field: EarlyAccessField) => {
    clearTransientAlert();
    setErrors((current) =>
      errorFor(current, field) === undefined
        ? current
        : withoutError(current, field)
    );
  };

  const handleDraftInput = () => {
    clearTransientAlert();
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
    if (isSubmitting || submittingRef.current) {
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

    submittingRef.current = true;
    setStatus("submitting");
    const honeypot = String(formData.get(EARLY_ACCESS_HONEYPOT_FIELD) ?? "");
    const result = await submitEarlyAccess(request, honeypot);
    const guardRef = submittingRef;
    guardRef.current = false;

    if (result.kind === "accepted") {
      clearStoredDraft();
      setStatus("success");
      onSuccess?.();
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
      aria-busy={isSubmitting}
      onInput={handleDraftInput}
      onSubmit={handleSubmit}
      aria-label="Request early access"
      className="sm:border-rule sm:bg-background/60 relative sm:rounded-xl sm:border sm:p-7"
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
            readOnly={isSubmitting}
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
            readOnly={isSubmitting}
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
            readOnly={isSubmitting}
            maxLength={EARLY_ACCESS_LIMITS.message}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message")}
            onChange={() => clearError("message")}
            placeholder="For example: donor portals, annual statements, missionary rosters, or offline gifts…"
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
        <EarlyAccessAlertBanner
          status={status}
          alertHeading={alertHeading}
          contactEmail={contactEmail}
        />
      ) : null}

      <EarlyAccessFormFooter
        consentId={ids.consent}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export const EarlyAccessConfigured = ({
  contactEmail = null,
}: {
  readonly contactEmail?: string | null;
}): ReactNode => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] lg:items-start lg:gap-12">
      <div className="min-w-0">
        <p className="text-signal font-sans text-sm font-medium">
          Pilot intake
        </p>
        <h2
          id="early-access-title"
          className="font-heading text-foreground mt-3 text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.03] font-semibold tracking-[-0.035em] text-balance"
        >
          {submitted
            ? "What happens next."
            : "Request early access for your team."}
        </h2>
        <p className="text-muted-foreground mt-4 max-w-[34rem] text-base leading-7 text-pretty sm:text-[1.0625rem] sm:leading-8">
          {submitted
            ? "The Asymmetric.al team reviews requests from nonprofit teams as onboarding capacity opens and follows up by email."
            : "Tell us which organization you’re with and what part of giving or donor care you’d like help with. This requests a team conversation, not an account or reservation; please don’t include donor information."}
        </p>
      </div>
      <div className="min-w-0">
        <EarlyAccessForm
          contactEmail={contactEmail}
          onSuccess={() => setSubmitted(true)}
        />
      </div>
    </div>
  );
};

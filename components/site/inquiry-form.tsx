"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Copy, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

type InquiryKind = "waitlist" | "contact";

const presets = {
  waitlist: {
    title: "Start the conversation",
    description:
      "Tell us who you are, where your organization is feeling administrative drag, and what a healthy next step would look like.",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      {
        name: "organization",
        label: "Organization",
        type: "text",
        required: true,
      },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
    ],
    textarea: {
      name: "challenge",
      label: "What is your biggest operational bottleneck right now?",
      placeholder:
        "Disconnected tools, donor systems, mobilization friction, finance reconciliation, fragmented websites, or something else.",
    },
    subject: "Asymmetric.al waitlist request",
    helper:
      "Your note is sent securely to our team. We will reply to the email you provide.",
  },
  contact: {
    title: "Send a direct note",
    description:
      "Use this for agency questions, donor and governance questions, technical partnership conversations, or media inquiries.",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      {
        name: "organization",
        label: "Organization",
        type: "text",
        required: false,
      },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "topic", label: "Topic", type: "text", required: true },
    ],
    textarea: {
      name: "message",
      label: "Message",
      placeholder:
        "Share enough detail for us to route your note quickly and respond with context.",
    },
    subject: "Asymmetric.al contact request",
    helper:
      "Your message is delivered to our inbox. We typically respond within about one business day.",
  },
} as const;

function buildMailtoLink(kind: InquiryKind, form: FormData): string {
  const preset = presets[kind];
  const lines = preset.fields.map((field) => {
    const value = (form.get(field.name) ?? "").toString().trim();
    return `${field.label}: ${value || "Not provided"}`;
  });
  const message = (form.get(preset.textarea.name) ?? "").toString().trim();
  const body = [
    preset.title,
    "",
    ...lines,
    "",
    `${preset.textarea.label}:`,
    message || "Not provided",
  ].join("\n");

  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    preset.subject
  )}&body=${encodeURIComponent(body)}`;
}

function formDataToPayload(kind: InquiryKind, form: FormData): Record<string, string> {
  const preset = presets[kind];
  const payload: Record<string, string> = { kind };
  for (const field of preset.fields) {
    payload[field.name] = (form.get(field.name) ?? "").toString().trim();
  }
  payload[preset.textarea.name] = (form.get(preset.textarea.name) ?? "")
    .toString()
    .trim();
  return payload;
}

export function InquiryForm({ kind }: { kind: InquiryKind }) {
  const preset = presets[kind];
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [draftMailto, setDraftMailto] = useState("");
  const [copied, setCopied] = useState(false);
  const mailtoStatusRef = useRef<HTMLParagraphElement | null>(null);

  async function copyEmailAddress() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="page-shell-glow surface-panel surface-interactive rounded-[2rem] p-6 sm:p-8">
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard." : ""}
      </span>

      <div className="max-w-2xl">
        <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
          {kind === "waitlist" ? "Join the waitlist" : "Contact"}
        </p>
        <h2 className="font-heading text-foreground mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
          {preset.title}
        </h2>
        <p className="text-muted-foreground mt-3 text-base leading-7">
          {preset.description}
        </p>
      </div>

      <form
        className="mt-8"
        aria-label={kind === "waitlist" ? "Waitlist inquiry" : "Contact inquiry"}
        onSubmit={async (event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const fd = new FormData(form);
          setSubmitState("submitting");
          setErrorMessage("");

          try {
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formDataToPayload(kind, fd)),
            });
            const data = (await res.json().catch(() => ({}))) as {
              error?: string;
            };

            if (!res.ok) {
              setErrorMessage(
                data.error ?? "Something went wrong. Please try again.",
              );
              setSubmitState("error");
              return;
            }

            setDraftMailto(buildMailtoLink(kind, fd));
            setSubmitState("success");
            form.reset();
            requestAnimationFrame(() => {
              mailtoStatusRef.current?.focus();
            });
          } catch {
            setErrorMessage(
              "Network error. Check your connection or email us directly.",
            );
            setSubmitState("error");
          }
        }}
      >
        <FieldGroup>
          <div className="grid gap-4 sm:grid-cols-2">
            {preset.fields.map((field) => (
              <Field key={field.name}>
                <FieldContent>
                  <FieldLabel htmlFor={`${kind}-${field.name}`}>
                    {field.label}
                    {field.required ? (
                      <span className="text-muted-foreground">*</span>
                    ) : null}
                  </FieldLabel>
                  <Input
                    id={`${kind}-${field.name}`}
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    placeholder={field.label}
                    disabled={submitState === "submitting"}
                    autoComplete={
                      field.name === "name"
                        ? "name"
                        : field.name === "email"
                          ? "email"
                          : field.name === "organization"
                            ? "organization"
                            : undefined
                    }
                  />
                </FieldContent>
              </Field>
            ))}
          </div>

          <Field>
            <FieldContent>
              <FieldLabel htmlFor={`${kind}-${preset.textarea.name}`}>
                {preset.textarea.label}
              </FieldLabel>
              <Textarea
                id={`${kind}-${preset.textarea.name}`}
                name={preset.textarea.name}
                rows={6}
                placeholder={preset.textarea.placeholder}
                disabled={submitState === "submitting"}
              />
              <FieldDescription>{preset.helper}</FieldDescription>
            </FieldContent>
          </Field>

          <div
            className="border-foreground/10 bg-secondary/42 text-muted-foreground grid gap-4 rounded-[1.75rem] border p-4 text-sm leading-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
            role="region"
            aria-label="Send and alternatives"
          >
            <div className="flex items-start gap-3">
              <Mail className="text-primary/70 mt-1 size-4 shrink-0" aria-hidden />
              <div
                className="flex min-w-0 flex-col gap-2"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                {submitState === "success" ? (
                  <>
                    <p
                      ref={mailtoStatusRef}
                      tabIndex={-1}
                      className={cn(
                        "text-foreground font-medium outline-none",
                        "rounded-[0.35rem] focus-visible:ring-[3px] focus-visible:ring-ring/45",
                      )}
                    >
                      Message sent — thank you. We will reply to the email you
                      provided.
                    </p>
                    <p>
                      Prefer your own client? You can still reach us at{" "}
                      <Link
                        href={`mailto:${siteConfig.email}`}
                        className="link-resilient text-foreground font-medium underline underline-offset-4"
                      >
                        {siteConfig.email}
                      </Link>
                      .
                    </p>
                  </>
                ) : submitState === "error" ? (
                  <p className="text-foreground font-medium">{errorMessage}</p>
                ) : (
                  <p>
                    Submitting sends your message to our team. You can also copy
                    our address or open your email app if you prefer.
                  </p>
                )}
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2 lg:items-end">
              {submitState === "success" ? (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="px-5"
                  onClick={() => {
                    setSubmitState("idle");
                    setErrorMessage("");
                    setDraftMailto("");
                  }}
                >
                  Send another message
                  <ArrowRight data-icon="inline-end" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="lg"
                  className="px-5"
                  disabled={submitState === "submitting"}
                >
                  {submitState === "submitting" ? (
                    <>
                      <Loader2
                        className="size-4 shrink-0 animate-spin"
                        aria-hidden
                      />
                      Sending…
                    </>
                  ) : kind === "waitlist" ? (
                    <>
                      Send waitlist request
                      <ArrowRight data-icon="inline-end" />
                    </>
                  ) : (
                    <>
                      Send message
                      <ArrowRight data-icon="inline-end" />
                    </>
                  )}
                </Button>
              )}
              <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={copyEmailAddress}
                  disabled={submitState === "submitting"}
                >
                  {copied ? (
                    <Check data-icon="inline-start" />
                  ) : (
                    <Copy data-icon="inline-start" />
                  )}
                  {copied ? "Copied" : "Copy email"}
                </Button>
                <Link
                  href={draftMailto || `mailto:${siteConfig.email}`}
                  className="link-resilient text-muted-foreground hover:border-foreground/10 hover:bg-background/72 hover:text-foreground inline-flex min-h-9 w-full items-center justify-center rounded-full border border-transparent px-3 py-2 text-center text-sm font-medium transition-[color,background-color,border-color] duration-200 md:w-auto md:max-w-[18rem]"
                >
                  Open in email app
                </Link>
              </div>
            </div>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}

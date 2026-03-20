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
import { ArrowRight, Check, Copy, Mail } from "lucide-react";
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
      "Submitting opens your email client with a pre-filled note to info@asymmetric.al. That keeps the repo production-safe until a live form backend is chosen.",
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
      "Submitting opens your email client with a formatted message to info@asymmetric.al.",
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

export function InquiryForm({ kind }: { kind: InquiryKind }) {
  const preset = presets[kind];
  const [hasOpenedEmail, setHasOpenedEmail] = useState(false);
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
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const mailto = buildMailtoLink(kind, form);
          setDraftMailto(mailto);
          setHasOpenedEmail(true);
          window.open(mailto, "_self");
          requestAnimationFrame(() => {
            mailtoStatusRef.current?.focus();
          });
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
              />
              <FieldDescription>{preset.helper}</FieldDescription>
            </FieldContent>
          </Field>

          <div
            className="border-foreground/10 bg-secondary/42 text-muted-foreground grid gap-4 rounded-[1.75rem] border p-4 text-sm leading-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
            role="region"
            aria-label="Email handoff"
          >
            <div className="flex items-start gap-3">
              <Mail className="text-primary/70 mt-1 size-4 shrink-0" aria-hidden />
              <div
                className="flex min-w-0 flex-col gap-2"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                {!hasOpenedEmail ? (
                  <p>
                    We will open your email client with a drafted message so the
                    details stay in your control.
                  </p>
                ) : (
                  <>
                    <p
                      ref={mailtoStatusRef}
                      tabIndex={-1}
                      className={cn(
                        "text-foreground font-medium outline-none",
                        "rounded-[0.35rem] focus-visible:ring-[3px] focus-visible:ring-ring/45"
                      )}
                    >
                      Draft handed off — finish the message in your email app.
                    </p>
                    <p>
                      If nothing opened, use the actions at right or write
                      directly to{" "}
                      <Link
                        href={`mailto:${siteConfig.email}`}
                        className="link-resilient text-foreground font-medium underline underline-offset-4"
                      >
                        {siteConfig.email}
                      </Link>
                      .
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2 lg:items-end">
              <Button type="submit" size="lg" className="px-5">
                {kind === "waitlist"
                  ? "Draft waitlist email"
                  : "Draft contact email"}
                <ArrowRight data-icon="inline-end" />
              </Button>
              <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={copyEmailAddress}
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
                  Open direct email
                </Link>
              </div>
            </div>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}

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
import { ArrowRight, Check, Copy, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
    <div className="surface-panel rounded-[2rem] p-6 sm:p-8">
      <div className="max-w-2xl">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-primary/70">
          {kind === "waitlist" ? "Join the waitlist" : "Contact"}
        </p>
        <h2 className="mt-4 font-heading text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
          {preset.title}
        </h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          {preset.description}
        </p>
      </div>

      <form
        className="mt-8"
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const mailto = buildMailtoLink(kind, form);
          setDraftMailto(mailto);
          setHasOpenedEmail(true);
          window.open(mailto, "_self");
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

          <div className="grid gap-3 rounded-[1.5rem] border border-foreground/10 bg-secondary/42 p-4 text-sm leading-6 text-muted-foreground sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div className="flex items-start gap-3">
              <Mail className="mt-1 size-4 shrink-0 text-primary/70" />
              <div className="flex flex-col gap-1">
                <p>
                  We will open your email client with a drafted message so the
                  details stay in your control.
                </p>
                {hasOpenedEmail ? (
                  <p>
                    If nothing opened, use the actions at right or write
                    directly to{" "}
                    <Link
                      href={`mailto:${siteConfig.email}`}
                      className="font-medium text-foreground underline underline-offset-4"
                    >
                      {siteConfig.email}
                    </Link>
                    .
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:items-end">
              <Button type="submit" size="lg" className="px-5">
                {kind === "waitlist"
                  ? "Draft waitlist email"
                  : "Draft contact email"}
                <ArrowRight data-icon="inline-end" />
              </Button>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={copyEmailAddress}
                >
                  {copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
                  {copied ? "Copied" : "Copy email"}
                </Button>
                <Link
                  href={draftMailto || `mailto:${siteConfig.email}`}
                  className="inline-flex h-9 items-center justify-center rounded-full px-3 text-sm font-medium text-muted-foreground hover:bg-background/72 hover:text-foreground"
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

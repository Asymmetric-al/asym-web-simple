"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/config";
import { ArrowRight, Mail } from "lucide-react";
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

  return (
    <div className="rounded-[2rem] border border-foreground/10 bg-card/88 p-6 shadow-[0_28px_80px_-58px_rgba(22,33,43,0.85)] backdrop-blur-sm sm:p-8">
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
        className="mt-8 grid gap-4 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const mailto = buildMailtoLink(kind, form);
          setHasOpenedEmail(true);
          window.location.href = mailto;
        }}
      >
        {preset.fields.map((field) => (
          <label key={field.name} className="flex flex-col gap-2 text-sm font-medium text-foreground">
            <span>{field.label}</span>
            <Input
              type={field.type}
              name={field.name}
              required={field.required}
              placeholder={field.label}
              className="h-11 rounded-[1.15rem] border-foreground/10 bg-background/80"
            />
          </label>
        ))}

        <label className="flex flex-col gap-2 text-sm font-medium text-foreground sm:col-span-2">
          <span>{preset.textarea.label}</span>
          <Textarea
            name={preset.textarea.name}
            rows={6}
            placeholder={preset.textarea.placeholder}
            className="rounded-[1.35rem] border-foreground/10 bg-background/80"
          />
        </label>

        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 rounded-[1.25rem] bg-secondary/45 px-4 py-3 text-sm leading-6 text-muted-foreground">
            <Mail className="mt-1 size-4 shrink-0 text-primary/70" />
            <div>
              <p>{preset.helper}</p>
              {hasOpenedEmail ? (
                <p className="mt-1">
                  If nothing opened, send your note directly to{" "}
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

          <Button type="submit" size="lg" className="rounded-full px-5">
            {kind === "waitlist" ? "Open waitlist email" : "Open contact email"}
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}

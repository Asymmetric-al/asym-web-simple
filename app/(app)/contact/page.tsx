"use client";

import { SpotlightCard, TechPanel, ScrambleText, Input, TextArea, Button } from "@/components/ui/terminal";
import { Mail, MapPin, MessageSquare, ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import React, { FormEvent, useCallback } from "react";

const contactChannels = [
  {
    id: "general",
    icon: Mail,
    title: "General Inquiry",
    content: "info@asymmetric.al",
    meta: "RESPONSE TIME: ~24HRS",
    href: "mailto:info@asymmetric.al",
  },
  {
    id: "builder",
    icon: MessageSquare,
    title: "Builder Support",
    content: "github.com/asymmetric-al",
    href: "https://github.com/Asymmetric-al",
  },
  {
    id: "hq",
    icon: MapPin,
    title: "Global HQ",
    content: (
      <>
        Global Fellowship Inc.<br />
        Attn: Asymmetric.al Project<br />
        PO Box 1<br />
        Meadow Vista, CA 95722
      </>
    ),
  },
] as const;

export default function ContactPage() {
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background font-sans overflow-x-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none z-0" />

      {/* Background Globe */}
      <div className="fixed right-0 bottom-0 translate-x-1/3 translate-y-1/3 opacity-30 pointer-events-none z-0 mix-blend-screen">
        <div className="w-64 h-64 rounded-full bg-primary/5 blur-3xl" style={{ transform: "scale(1.5)" }} />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-20 mt-12">
          {/* Hero Section */}
          <div className="animate-in fade-in duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-border bg-secondary/50 rounded-full text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-8 backdrop-blur-md">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="inline-block">OPEN CHANNEL</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-display font-bold text-foreground tracking-tighter leading-[0.9] mb-8">
              Start the<br />Conversation.
            </h1>
            <p className="text-xl text-muted-foreground font-light max-w-2xl leading-relaxed text-balance border-l border-border pl-6">
              Whether you are an agency ready to migrate or a builder looking to contribute, we are ready to listen.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start mb-24">
          {/* Channels Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="animate-in fade-in duration-500" style={{ animationDelay: "200ms" }}>
              <div className="rounded-2xl border border-border p-6 bg-card/80 backdrop-blur-md">
                <div className="mb-4 text-sm font-mono uppercase tracking-wider text-muted-foreground">CHANNELS</div>
                <div className="space-y-8">
                  {contactChannels.map((channel, index) => (
                    <React.Fragment key={channel.id}>
                      {channel.href ? (
                        <Link
                          href={channel.href}
                          target={channel.href.startsWith("http") ? "_blank" : undefined}
                          rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="group block cursor-pointer"
                        >
                          <div className="flex items-center gap-3 text-foreground mb-2 group-hover:text-primary transition-colors">
                            <channel.icon size={20} strokeWidth={1.5} />
                            <h3 className="font-display font-bold text-lg tracking-tight">{channel.title}</h3>
                          </div>
                          <div className="text-sm text-muted-foreground font-mono pl-8 mb-2 leading-relaxed group-hover:text-foreground transition-colors">
                            {channel.content}
                          </div>
                          {channel.meta && (
                            <div className="pl-8 text-[10px] text-green-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                              {channel.meta}
                            </div>
                          )}
                        </Link>
                      ) : (
                        <div className="group">
                          <div className="flex items-center gap-3 text-foreground mb-2 group-hover:text-primary transition-colors">
                            <channel.icon size={20} strokeWidth={1.5} />
                            <h3 className="font-display font-bold text-lg tracking-tight">{channel.title}</h3>
                          </div>
                          <div className="text-sm text-muted-foreground font-mono pl-8 mb-2 leading-relaxed group-hover:text-foreground transition-colors">
                            {channel.content}
                          </div>
                          {channel.meta && (
                            <div className="pl-8 text-[10px] text-green-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                              {channel.meta}
                            </div>
                          )}
                        </div>
                      )}
                      {index < contactChannels.length - 1 && <div className="w-full h-px bg-border"></div>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-7">
            <div className="animate-in fade-in duration-500" style={{ animationDelay: "400ms" }}>
              <div className="relative overflow-hidden rounded-2xl bg-card border-border p-1">
                <div className="bg-background p-8 md:p-10 relative overflow-hidden">
                  <div className="flex items-center gap-2 text-muted-foreground mb-8 pb-4 border-b border-border">
                    <Terminal size={16} />
                    <span className="font-mono text-xs uppercase tracking-widest">Transmission Uplink</span>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Identity // Name</label>
                        <input
                          type="text"
                          placeholder="H. TAYLOR"
                          name="name"
                          autoComplete="name"
                          required
                          className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Identity // Email</label>
                        <input
                          type="email"
                          placeholder="CONTACT@ORG.COM"
                          name="email"
                          autoComplete="email"
                          required
                          className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Context // Organization</label>
                      <input
                        type="text"
                        placeholder="GLOBAL MISSIONS INC."
                        name="organization"
                        autoComplete="organization"
                        className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Payload // Message</label>
                      <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-32"
                        placeholder="BRIEFING DETAILS..."
                        name="message"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full py-6 mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      Transmit Message
                      <ArrowRight size={16} className="ml-2" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
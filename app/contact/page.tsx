import { Reveal, Button, DitherGlobe, GridPattern, SpotlightCard, TechPanel, ScrambleText, Container, Input, TextArea } from "@/components/ui/terminal";
import { Mail, MapPin, MessageSquare, ArrowRight, Terminal } from "lucide-react";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a direct conversation with Asymmetric.al about agency fit, giving, governance, or joining the build.",
};

export default function ContactPage() {
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background font-sans overflow-x-hidden">
      <GridPattern className="opacity-20 fixed inset-0 z-0" />

      <div className="fixed right-0 bottom-0 translate-x-1/3 translate-y-1/3 opacity-30 pointer-events-none z-0 mix-blend-screen">
        <DitherGlobe scale={1.5} />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mb-20 mt-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-border bg-secondary/50 rounded-full text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-8 backdrop-blur-md">
              <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
              <ScrambleText text="OPEN CHANNEL" delay={200} />
            </div>

            <h1 className="text-6xl md:text-8xl font-display font-bold text-foreground tracking-tighter leading-[0.9] mb-8">
              Start the<br />Conversation.
            </h1>
            <p className="text-xl text-muted-foreground font-light max-w-2xl leading-relaxed text-balance border-l border-border pl-6">
              Whether you are an agency ready to migrate or a builder looking to contribute, we are ready to listen.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start mb-24">
          <div className="lg:col-span-5 space-y-6">
            <Reveal delay={200}>
              <TechPanel title="CHANNELS" className="bg-card/80 backdrop-blur-md">
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
                            <div className="pl-8 text-[10px] text-success uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
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
                            <div className="pl-8 text-[10px] text-success uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                              {channel.meta}
                            </div>
                          )}
                        </div>
                      )}
                      {index < contactChannels.length - 1 && <div className="w-full h-px bg-border"></div>}
                    </React.Fragment>
                  ))}
                </div>
              </TechPanel>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={400}>
              <SpotlightCard className="bg-card border-border p-1">
                <div className="bg-background p-8 md:p-10 relative overflow-hidden">
                  <div className="flex items-center gap-2 text-muted-foreground mb-8 pb-4 border-b border-border">
                    <Terminal size={16} />
                    <span className="font-mono text-xs uppercase tracking-widest">Transmission Uplink</span>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Identity // Name"
                        type="text"
                        placeholder="H. TAYLOR"
                        name="name"
                        autoComplete="name"
                        required
                      />
                      <Input
                        label="Identity // Email"
                        type="email"
                        placeholder="CONTACT@ORG.COM"
                        name="email"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <Input
                      label="Context // Organization"
                      type="text"
                      placeholder="GLOBAL MISSIONS INC."
                      name="organization"
                      autoComplete="organization"
                    />

                    <TextArea
                      label="Payload // Message"
                      className="h-32"
                      placeholder="BRIEFING DETAILS..."
                      name="message"
                      required
                    />

                    <Button className="w-full py-6 mt-4" icon={<ArrowRight size={16} />} type="submit">
                      Transmit Message
                    </Button>
                  </form>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </Container>
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return <div className="animate-in fade-in duration-500" style={{ animationDelay: `${delay}ms` }}>{children}</div>;
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

function DitherGlobe({ scale = 1.5 }: { scale?: number }) {
  return <div className="w-64 h-64 rounded-full bg-primary/5 blur-3xl" style={{ transform: `scale(${scale})` }} />;
}

function GridPattern({ className = "" }: { className?: string }) {
  return <div className={`absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] ${className}`} />;
}
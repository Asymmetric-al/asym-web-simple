import { footerGroups, siteConfig } from "@/lib/config";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { ArrowUpRight, MoveRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="pb-10 pt-6 sm:pb-12 sm:pt-8">
      <div className="mx-auto flex max-w-[80rem] flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <div className="page-shell-glow surface-hero overflow-hidden rounded-[2.35rem] p-7 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
            <div className="min-w-0 max-w-2xl">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-primary/70">
                Join the waitlist
              </p>
              <h2 className="mt-4 max-w-[16ch] text-balance font-heading text-[clamp(2.35rem,5vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-foreground">
                Build with open hands. Deploy with clarity.
              </h2>
              <p className="mt-5 max-w-[58ch] text-base leading-7 text-muted-foreground sm:text-lg">
                We build for the global church. We measure success in impact,
                not profit. Start a conversation if your agency is ready for a
                more coherent operating system.
              </p>
            </div>

            <div className="min-w-0 flex flex-col gap-3 lg:items-end">
              <div className="grid w-full gap-2 rounded-[1.5rem] border border-foreground/10 bg-background/62 p-4 text-sm text-muted-foreground sm:max-w-[22rem]">
                <span>Open-source foundations</span>
                <span>Tenant sovereignty by design</span>
                <span>Nonprofit 501(c)(3) posture</span>
              </div>
              <Link
                href={siteConfig.cta.primary.href}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full justify-center rounded-full px-6 sm:w-auto"
                )}
              >
                {siteConfig.cta.primary.label}
                <MoveRight data-icon="inline-end" />
              </Link>
              <Link
                href={siteConfig.cta.secondary.href}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full justify-center rounded-full px-6 sm:w-auto"
                )}
              >
                {siteConfig.cta.secondary.label}
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </div>
          </div>
        </div>

        <div className="surface-panel rounded-[2.35rem] p-7 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)_minmax(0,0.75fr)_minmax(0,0.75fr)]">
            <div className="min-w-0 max-w-xl">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.3em] text-primary/70">
                The Manifesto
              </p>
              <h3 className="mt-4 font-heading text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl">
                WE BUILD FOR THE GLOBAL CHURCH.
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                Asymmetric.al is a nonprofit project shaping a missions-first
                operating system for executive, operations, finance, and
                advancement teams. Soli Deo Gloria.
              </p>
            </div>

            {footerGroups.map((group) => (
              <div key={group.title} className="min-w-0">
                <h4 className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-muted-foreground">
                  {group.title}
                </h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/84 hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-5 border-t border-foreground/10 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <div className="content-measure">
              Operating as a project under {siteConfig.nonprofit}. EIN:{" "}
              {siteConfig.ein}
            </div>
            <div className="flex flex-col gap-1 sm:items-end">
              <Link
                href={`mailto:${siteConfig.email}`}
                className="link-resilient inline-block w-full max-w-[20rem] text-left hover:text-foreground sm:text-right"
              >
                {siteConfig.email}
              </Link>
              <span>Asymmetric.al © 2026</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

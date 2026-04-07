import { footerGroups, siteConfig } from "@/lib/config";
import { buttonVariants } from "@/components/ui/button-variants";
import { SiteLogoMark } from "@/components/site/site-logo-mark";
import { cn } from "@/lib/utils";
import { ArrowUpRight, MoveRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="pt-6 pb-10 sm:pt-8 sm:pb-12">
      <div className="mx-auto flex max-w-[80rem] flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <div className="page-shell-glow surface-hero surface-interactive overflow-hidden rounded-[2.35rem] p-7 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
            <div className="max-w-2xl min-w-0">
              <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.3em] uppercase">
                Join the waitlist
              </p>
              <h2 className="font-heading text-foreground mt-4 max-w-[16ch] text-[clamp(2.35rem,5vw,4.6rem)] leading-[0.95] font-semibold tracking-[-0.06em] text-balance">
                Build with open hands. Deploy with clarity.
              </h2>
              <p className="text-muted-foreground mt-5 max-w-[58ch] text-base leading-7 sm:text-lg">
                We build for the global church. We measure success in impact,
                not profit. Start a conversation if your agency is ready for a
                more coherent operating system.
              </p>
            </div>

            <div className="flex min-w-0 flex-col gap-3 lg:items-end">
              <div className="border-foreground/10 bg-background/62 text-muted-foreground grid w-full gap-2 rounded-[1.5rem] border p-4 text-sm sm:max-w-[22rem]">
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

        <div className="surface-panel surface-interactive rounded-[2.35rem] p-7 sm:p-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)_minmax(0,0.7fr)_minmax(0,0.7fr)] lg:gap-10">
            <div className="max-w-xl min-w-0 lg:pr-6">
              <SiteLogoMark className="text-primary/80 mb-6 size-10" />
              <h3 className="font-heading flex flex-col items-start font-bold uppercase tracking-[-0.05em]">
                <span className="text-foreground text-xl leading-[1.15] sm:text-2xl md:text-3xl">
                  We build for the <span className="text-muted-foreground">global church.</span>
                </span>
                <span className="text-foreground text-xl leading-[1.15] sm:text-2xl md:text-3xl">
                  We measure success in
                </span>
                <span className="mt-1 flex flex-col">
                  <span className="text-foreground text-[clamp(3.5rem,7vw,5.5rem)] leading-[0.8] tracking-[-0.07em]">
                    Impact,
                  </span>
                  <span className="text-muted-foreground mt-1.5 self-end text-xl leading-[1.15] sm:mt-2 sm:text-2xl md:text-3xl">
                    Not profit.
                  </span>
                </span>
              </h3>
              <p className="text-muted-foreground mt-6 text-sm leading-7 sm:text-base">
                Asymmetric.al is a nonprofit project shaping a missions-first
                operating system for executive, operations, finance, and
                advancement teams. Soli Deo Gloria.
              </p>
            </div>

            {footerGroups.map((group) => (
              <div key={group.title} className="min-w-0">
                <h4 className="text-muted-foreground font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                  {group.title}
                </h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-foreground/84 hover:text-foreground inline-flex items-center text-sm transition-[color,transform] duration-200 hover:translate-x-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-foreground/10 text-muted-foreground mt-12 flex flex-col gap-6 border-t pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="content-measure max-w-xl leading-relaxed">
              Operating as a project under {siteConfig.nonprofit} EIN:{" "}
              {siteConfig.ein}
            </div>
            <div className="flex flex-col gap-1.5 sm:items-end">
              <Link
                href={`mailto:${siteConfig.email}`}
                className="link-resilient text-foreground hover:text-primary font-mono text-[0.72rem] tracking-[0.2em] uppercase transition-colors sm:text-right"
              >
                {siteConfig.email}
              </Link>
              <span className="font-mono text-[0.72rem] tracking-[0.15em] uppercase opacity-70">
                Asymmetric.al © {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

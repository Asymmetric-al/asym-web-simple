import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Container } from "@/components/site/page";
import { buttonVariants } from "@/components/ui/button-variants";
import { navigationLinks, siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn’t exist on asym.app.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,var(--glow-primary),transparent_58%)]"
      />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 items-center pt-32 pb-20 outline-none sm:pt-36"
      >
        <Container className="max-w-3xl">
          <p className="text-primary/80 font-mono text-xs tracking-[0.24em] uppercase">
            404
          </p>
          <h1 className="font-heading text-foreground mt-4 text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.02] font-semibold tracking-[-0.055em] text-balance">
            This page doesn’t exist.
          </h1>
          <p className="text-muted-foreground mt-5 max-w-[38rem] text-lg leading-8">
            The link may be from an older version of the site. Everything about{" "}
            <span translate="no">{siteConfig.shortName}</span> is on the
            homepage now.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className={cn(buttonVariants({ size: "lg" }), "px-6")}
            >
              Go to the homepage
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
            <Link
              href={siteConfig.cta.primary.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "px-6"
              )}
            >
              Early access
            </Link>
          </div>
          <nav aria-label="Homepage sections" className="mt-10">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/78 hover:text-foreground focus-visible:ring-ring inline-flex min-h-11 items-center rounded-sm underline underline-offset-4 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:min-h-10"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

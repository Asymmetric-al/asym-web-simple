import Link from "next/link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Container } from "@/components/site/container";
import { ArrowRightIcon } from "@/components/site/icons";
import { buttonVariants } from "@/components/ui/button-variants";
import { navigationLinks, siteConfig } from "@/lib/config";
import { isEarlyAccessConfigured } from "@/lib/early-access-config";
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
  const isConfigured = isEarlyAccessConfigured();

  return (
    <div className="relative isolate flex min-h-dvh flex-col overflow-x-clip">
      <div aria-hidden="true" className="page-atmosphere" />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 items-center pt-32 pb-20 outline-none sm:pt-36"
      >
        <Container className="max-w-3xl">
          <p className="text-pine font-mono text-xs font-medium tracking-[0.02em]">
            404
          </p>
          <h1 className="font-heading text-foreground mt-4 text-[clamp(2.5rem,5vw,3.9rem)] leading-[1.02] font-medium tracking-[-0.03em] text-balance">
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
              className={cn(
                buttonVariants({ variant: "ink", size: "lg" }),
                "px-6"
              )}
            >
              Go to the homepage
              <ArrowRightIcon dataIcon="inline-end" />
            </Link>
            {isConfigured ? (
              <Link
                href={siteConfig.cta.primary.href}
                prefetch={false}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "px-6"
                )}
              >
                {siteConfig.cta.primary.label}
              </Link>
            ) : (
              <Link
                href="/#where-things-stand"
                prefetch={false}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "px-6"
                )}
              >
                Where things stand
              </Link>
            )}
          </div>
          <nav aria-label="Explore the homepage" className="mt-10">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="text-foreground/78 focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center rounded-[0.375rem] underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-10 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground"
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

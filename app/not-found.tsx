import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/site/page";
import { buttonVariants } from "@/components/ui/button-variants";
import { navigationLinks, siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-screen items-center py-24 outline-none"
    >
      <Container className="max-w-3xl">
        <p className="text-primary/75 font-mono text-xs tracking-[0.24em] uppercase">
          404
        </p>
        <h1 className="font-heading text-foreground mt-4 text-[clamp(2.4rem,5vw,3.8rem)] leading-[1] font-semibold tracking-[-0.06em] text-balance">
          This page doesn’t exist.
        </h1>
        <p className="text-muted-foreground mt-5 text-lg leading-8">
          The link may be from an older version of the site. Everything about{" "}
          {siteConfig.shortName} is on the homepage now.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={cn(buttonVariants({ size: "lg" }), "px-6")}>
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
            {siteConfig.cta.primary.label}
          </Link>
        </div>
        <nav aria-label="Homepage sections" className="mt-10">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-foreground/76 hover:text-foreground focus-visible:ring-ring/45 rounded-sm underline underline-offset-4 transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </main>
  );
}

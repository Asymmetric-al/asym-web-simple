import Link from "next/link";
import { SiteLogoMark } from "@/components/site/site-logo-mark";
import { buttonVariants } from "@/components/ui/button-variants";
import { navigationLinks, siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export const Header = () => (
  <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
    <div className="border-foreground/10 bg-background/88 mx-auto flex max-w-[80rem] items-center justify-between gap-3 rounded-full border py-1.5 pr-1.5 pl-4 shadow-[0_16px_42px_-34px_rgba(22,33,43,0.44)] backdrop-blur-md sm:pl-5">
      <Link
        href="/"
        className="group focus-visible:ring-ring/45 inline-flex min-w-0 items-center gap-2.5 rounded-full focus-visible:ring-[3px] focus-visible:outline-none"
        aria-label={`${siteConfig.shortName} home`}
      >
        <SiteLogoMark
          className="size-7 transition-transform duration-200 ease-out group-hover:-translate-y-px"
          imageSizes="28px"
          priority
        />
        <span className="font-heading text-foreground -translate-y-px text-lg leading-none font-semibold tracking-[-0.04em]">
          {siteConfig.shortName}
        </span>
      </Link>

      <nav aria-label="Main" className="hidden md:block">
        <ul className="flex items-center gap-1">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-foreground/76 hover:text-foreground hover:bg-muted/70 focus-visible:ring-ring/45 inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Link
        href={siteConfig.cta.primary.href}
        className={cn(buttonVariants({ size: "default" }), "shrink-0 px-4")}
      >
        <span className="sm:hidden">Early access</span>
        <span className="hidden sm:inline">{siteConfig.cta.primary.label}</span>
      </Link>
    </div>
  </header>
);

import Link from "next/link";
import { SiteLogoMark } from "@/components/site/site-logo-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { footerLinks, navigationLinks, siteConfig } from "@/lib/config";

const linkClassName =
  "text-foreground/76 hover:text-foreground focus-visible:ring-ring/45 rounded-sm underline-offset-4 transition-colors hover:underline focus-visible:ring-[3px] focus-visible:outline-none";

const currentYear = (): number => {
  const now = new Date();
  return now.getFullYear();
};

export const Footer = () => (
  <footer className="pb-8 sm:pb-10">
    <div className="mx-auto max-w-[82rem] px-4 sm:px-6 lg:px-8">
      <div className="border-foreground/10 flex flex-col gap-8 border-t pt-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-sm min-w-0">
          <Link
            href="/"
            className="focus-visible:ring-ring/45 inline-flex items-center gap-2 rounded-sm focus-visible:ring-[3px] focus-visible:outline-none"
            aria-label={`${siteConfig.shortName} home`}
          >
            <SiteLogoMark className="size-5" imageSizes="20px" />
            <span className="font-heading text-foreground -translate-y-px text-base leading-none font-semibold tracking-[-0.04em]">
              {siteConfig.shortName}
            </span>
          </Link>
          <p className="text-muted-foreground mt-3 text-sm leading-6">
            Open-source software for nonprofits, built by {siteConfig.name}.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-6">
          <nav aria-label="Footer">
            <ul className="grid gap-2 text-sm">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClassName}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="grid gap-2 text-sm" aria-label="Company">
            {footerLinks.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} className={linkClassName}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-muted-foreground mt-8 flex items-center justify-between gap-4 text-xs">
        <p>
          &copy; {currentYear()} {siteConfig.name}
        </p>
        <ThemeToggle />
      </div>
    </div>
  </footer>
);

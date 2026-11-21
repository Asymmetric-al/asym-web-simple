import Link from "next/link";
import { SiteLogoMark } from "@/components/site/site-logo-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { footerLinks, navigationLinks, siteConfig } from "@/lib/config";
import {
  getVerifiedContactEmail,
  isEarlyAccessConfigured,
} from "@/lib/early-access-config";

const linkClassName =
  "text-foreground/82 focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center rounded-md underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-9 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:underline";

const currentYear = (): number => {
  const now = new Date();
  return now.getFullYear();
};

export const Footer = () => {
  const contactEmail = getVerifiedContactEmail();
  const isConfigured = isEarlyAccessConfigured();

  return (
    <footer className="pb-10 sm:pb-12">
      <div className="mx-auto max-w-[82rem] px-4 sm:px-6 lg:px-8">
        <div className="border-rule-strong flex flex-col gap-8 border-t pt-9 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md min-w-0">
            <Link
              href="/"
              className="focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 items-center gap-2 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-9"
              aria-label={`${siteConfig.shortName} home`}
            >
              <SiteLogoMark className="size-5" size={20} />
              <span
                translate="no"
                className="text-foreground -translate-y-px font-sans text-base leading-none font-semibold tracking-[-0.03em]"
              >
                {siteConfig.shortName}
              </span>
            </Link>
            <p className="text-muted-foreground mt-2.5 text-sm leading-6 text-pretty">
              Open-source giving and donor-care software for nonprofits. Built
              by{" "}
              <span translate="no" className="text-foreground font-medium">
                {siteConfig.name}
              </span>
              , an independent, for&#8209;profit software company.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-4">
            <nav aria-label="Footer">
              <ul className="grid gap-0.5 text-sm sm:gap-1">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className={linkClassName}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ul className="grid gap-0.5 text-sm sm:gap-1" aria-label="Company">
              {footerLinks.map((link) => {
                const label =
                  !isConfigured && link.href === siteConfig.cta.primary.href
                    ? "Early access status"
                    : link.label;

                return (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClassName}
                      >
                        {label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        prefetch={!link.href.includes("#")}
                        className={linkClassName}
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                );
              })}
              {contactEmail ? (
                <li>
                  <a href={`mailto:${contactEmail}`} className={linkClassName}>
                    Contact
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        {/* Footer bar + theme selector */}
        <div className="border-rule text-muted-foreground mt-8 flex flex-col items-start gap-4 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear()}{" "}
            <span translate="no">{siteConfig.name}</span> · Code:{" "}
            <span translate="no" className="font-mono">
              Asymmetric-al/core
            </span>{" "}
            (AGPL-3.0-only)
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};

import Link from "next/link";
import { SiteLogoMark } from "@/components/site/site-logo-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { footerLinks, navigationLinks, siteConfig } from "@/lib/config";
import { getVerifiedContactEmail } from "@/lib/early-access-config";

const linkClassName =
  "text-foreground/78 hover:text-foreground focus-visible:ring-ring inline-flex min-h-11 items-center rounded-sm underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:min-h-9";

const currentYear = (): number => {
  const now = new Date();
  return now.getFullYear();
};

export const Footer = () => {
  const contactEmail = getVerifiedContactEmail();

  return (
    <footer className="pb-8 sm:pb-10">
      <div className="mx-auto max-w-[82rem] px-4 sm:px-6 lg:px-8">
        <div className="border-foreground/12 flex flex-col gap-8 border-t pt-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm min-w-0">
            <Link
              href="/"
              className="focus-visible:ring-ring inline-flex min-h-11 items-center gap-2 rounded-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:min-h-9"
              aria-label={`${siteConfig.shortName} home`}
            >
              <SiteLogoMark className="size-5" imageSizes="20px" />
              <span
                translate="no"
                className="font-heading text-foreground -translate-y-px text-base leading-none font-semibold tracking-[-0.04em]"
              >
                {siteConfig.shortName}
              </span>
            </Link>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              Open-source software for nonprofits, built by{" "}
              <span translate="no">{siteConfig.name}</span>.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-4">
            <nav aria-label="Footer">
              <ul className="grid gap-0.5 text-sm sm:gap-1">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClassName}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ul className="grid gap-0.5 text-sm sm:gap-1" aria-label="Company">
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
              {contactEmail ? (
                <li>
                  <a href={`mailto:${contactEmail}`} className={linkClassName}>
                    Contact
                  </a>
                </li>
              ) : (
                <li>
                  <a
                    href={siteConfig.issuesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  >
                    Questions on GitHub
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="text-muted-foreground mt-8 flex flex-col gap-4 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear()} <span translate="no">{siteConfig.name}</span>
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};

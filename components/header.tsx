import Link from "next/link";
import { MobileNavMenu } from "@/components/site/mobile-nav-menu";
import { SiteLogoMark } from "@/components/site/site-logo-mark";
import { buttonVariants } from "@/components/ui/button-variants";
import { navigationLinks, siteConfig } from "@/lib/config";
import { isEarlyAccessConfigured } from "@/lib/early-access-config";
import { cn } from "@/lib/utils";

export const Header = () => {
  const isConfigured = isEarlyAccessConfigured();
  const noJsMobileLinks = [
    ...navigationLinks,
    isConfigured
      ? { label: "Early access", href: "/#early-access" }
      : {
          label: "Pre-launch checklist",
          href: "/early-access/status?state=unavailable",
        },
  ] as const;

  return (
    <>
      <header className="border-rule bg-background fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)]">
        <div className="mx-auto flex h-16 max-w-[82rem] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3.5">
            <Link
              href="/"
              className="group focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 min-w-0 items-center gap-2.5 rounded-md px-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-10"
              aria-label={`${siteConfig.shortName} home`}
            >
              <SiteLogoMark
                className="size-7 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-px"
                size={28}
              />
              <span
                translate="no"
                className="text-foreground -translate-y-px font-sans text-[1.125rem] leading-none font-semibold tracking-[-0.03em]"
              >
                {siteConfig.shortName}
              </span>
            </Link>
            <span
              aria-hidden="true"
              className="bg-rule hidden h-4 w-px lg:block"
            />
            <span className="text-muted-foreground hidden text-xs lg:inline">
              For missions organizations
            </span>
          </div>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="text-foreground/82 focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-10 items-center rounded-md px-3.5 text-sm font-medium underline-offset-[6px] focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            {isConfigured ? (
              <Link
                href={siteConfig.cta.primary.href}
                prefetch={false}
                className={cn(
                  buttonVariants({
                    variant: "default",
                    size: "default",
                  }),
                  "shrink-0 px-4"
                )}
              >
                <span className="sm:hidden">Early access</span>
                <span className="hidden sm:inline">
                  {siteConfig.cta.primary.label}
                </span>
              </Link>
            ) : (
              <Link
                href="/#where-things-stand"
                prefetch={false}
                className={cn(
                  buttonVariants({
                    variant: "ink",
                    size: "default",
                  }),
                  "shrink-0 px-4"
                )}
              >
                See what’s built
              </Link>
            )}
            <MobileNavMenu isConfigured={isConfigured} />
          </div>
        </div>
      </header>

      <noscript>
        <nav
          aria-label="Homepage sections"
          className="border-rule bg-background border-b pt-16 md:hidden"
        >
          <ul className="mx-auto flex max-w-[82rem] flex-wrap items-center gap-x-5 gap-y-1 px-4 py-1 text-sm sm:px-6">
            {noJsMobileLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch={false}
                  className="text-foreground/82 inline-flex min-h-11 items-center rounded-md font-medium underline-offset-4 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </noscript>
    </>
  );
};

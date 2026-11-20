import Link from "next/link";
import { SiteLogoMark } from "@/components/site/site-logo-mark";
import { buttonVariants } from "@/components/ui/button-variants";
import { navigationLinks, siteConfig } from "@/lib/config";
import { isEarlyAccessConfigured } from "@/lib/early-access-config";
import { cn } from "@/lib/utils";

export const Header = () => {
  const isConfigured = isEarlyAccessConfigured();

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[max(0.75rem,env(safe-area-inset-top))] pr-[max(0.75rem,env(safe-area-inset-right))] pl-[max(0.75rem,env(safe-area-inset-left))] sm:pr-[max(1rem,env(safe-area-inset-right))] sm:pl-[max(1rem,env(safe-area-inset-left))]">
      <div className="border-foreground/12 bg-background/92 mx-auto flex max-w-[80rem] items-center justify-between gap-3 rounded-full border py-1.5 pr-1.5 pl-3.5 shadow-[0_16px_42px_-34px_rgba(22,33,43,0.4)] backdrop-blur-md sm:pl-5">
        <Link
          href="/"
          className="group focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-11 min-w-0 items-center gap-2.5 rounded-full px-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-10"
          aria-label={`${siteConfig.shortName} home`}
        >
          <SiteLogoMark
            className="size-7 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-px"
            size={28}
          />
          <span
            translate="no"
            className="font-heading text-foreground -translate-y-px text-lg leading-none font-semibold tracking-[-0.03em]"
          >
            {siteConfig.shortName}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-foreground/78 hover:text-foreground hover:bg-muted/75 focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent"
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
          {isConfigured ? (
            <>
              <span className="sm:hidden">Early access</span>
              <span className="hidden sm:inline">
                {siteConfig.cta.primary.label}
              </span>
            </>
          ) : (
            <>
              <span className="sm:hidden">Early access</span>
              <span className="hidden sm:inline">Early access status</span>
            </>
          )}
        </Link>
      </div>
    </header>
  );
};

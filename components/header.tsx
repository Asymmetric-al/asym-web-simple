import { SiteLogoMark } from "@/components/site/site-logo-mark";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[76rem] px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group border-foreground/10 bg-background/50 focus-visible:ring-ring focus-visible:ring-offset-background mt-3 inline-flex min-w-0 items-center gap-2 rounded-full border px-4 py-2 shadow-[0_14px_38px_-32px_rgba(22,33,43,0.42)] backdrop-blur-md transition-[background-color,border-color,transform] duration-200 ease-out hover:-translate-y-px hover:bg-background/64 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:mt-4"
          aria-label={`${siteConfig.shortName} home`}
        >
          <SiteLogoMark className="text-primary size-4.5 transition-transform duration-200 ease-out group-hover:-translate-y-px" />
          <span className="text-resilient font-heading text-foreground min-w-0 text-sm leading-none font-semibold tracking-[-0.04em]">
            {siteConfig.shortName}
          </span>
        </Link>
      </div>
    </header>
  );
}

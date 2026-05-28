import { SiteLogoMark } from "@/components/site/site-logo-mark";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[76rem] px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group border-foreground/10 bg-background/50 focus-visible:ring-ring focus-visible:ring-offset-background mt-3 inline-flex min-w-0 items-center gap-2.5 rounded-full border px-4 py-2.5 shadow-[0_16px_42px_-34px_rgba(22,33,43,0.44)] backdrop-blur-md transition-[background-color,border-color,transform] duration-200 ease-out hover:-translate-y-px hover:bg-background/64 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:mt-4 sm:gap-3 sm:px-5"
          aria-label={`${siteConfig.shortName} home`}
        >
          <SiteLogoMark
            className="text-primary size-7 transition-transform duration-200 ease-out group-hover:-translate-y-px"
            imageSizes="28px"
            priority
          />
          <span className="text-resilient font-heading text-foreground inline-block min-w-0 -translate-y-px text-base leading-none font-semibold tracking-[-0.04em] sm:text-lg">
            {siteConfig.shortName}
          </span>
        </Link>
      </div>
    </header>
  );
}

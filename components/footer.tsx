import Link from "next/link";
import { SiteLogoMark } from "@/components/site/site-logo-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { footerGroups, siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="pb-8 sm:pb-10">
      <div className="mx-auto max-w-[76rem] px-4 sm:px-6 lg:px-8">
        <div className="border-foreground/10 bg-background/48 rounded-[1.8rem] border p-5 shadow-[0_24px_72px_-58px_rgba(22,33,43,0.5)] backdrop-blur-md sm:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl min-w-0">
              <Link
                href="/"
                className="focus-visible:ring-ring focus-visible:ring-offset-background inline-flex min-w-0 items-center gap-2 rounded-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                aria-label={`${siteConfig.shortName} home`}
              >
                <SiteLogoMark
                  className="text-primary size-5"
                  imageSizes="20px"
                />
                <span className="font-heading text-foreground inline-block -translate-y-px text-base leading-none font-semibold tracking-[-0.04em]">
                  {siteConfig.shortName}
                </span>
              </Link>
              <p className="text-muted-foreground mt-4 max-w-[54ch] text-sm leading-6">
                Asym exists to carry the operational weight for Christian
                missions organizations, so they can stay focused on people and
                the Gospel.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`mailto:${siteConfig.email}?subject=Building%20with%20Asym`}
                className="text-foreground/84 hover:text-primary focus-visible:ring-ring/45 link-resilient rounded-sm text-sm font-medium underline-offset-4 transition-colors hover:underline focus-visible:ring-[3px] focus-visible:outline-none"
              >
                {siteConfig.email}
              </Link>
              <Link
                href="https://github.com/Asymmetric-al"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/76 hover:text-primary focus-visible:ring-ring/45 border-foreground/10 bg-background/58 hover:bg-background/82 inline-flex size-9 items-center justify-center rounded-full border transition-[color,background-color,border-color,transform] duration-200 ease-out hover:-translate-y-px focus-visible:ring-[3px] focus-visible:outline-none active:scale-[0.985]"
                aria-label="GitHub"
              >
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="size-4"
                  fill="currentColor"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </Link>
              <ThemeToggle />
            </div>
          </div>

          <div className="border-foreground/10 text-muted-foreground mt-6 flex flex-col gap-4 border-t pt-5 text-xs leading-6 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Asymmetric.al &copy; {new Date().getFullYear()}. Operating under{" "}
              {siteConfig.nonprofit}, EIN {siteConfig.ein}.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {footerGroups.flatMap((group) =>
                group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-foreground/72 hover:text-foreground focus-visible:ring-ring/45 rounded-sm underline-offset-4 transition-colors hover:underline focus-visible:ring-[3px] focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

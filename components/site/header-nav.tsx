"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scrollspy } from "@/components/site/reui/scrollspy";
import { navigationLinks } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const getSectionAnchorId = (href: string): string | undefined => {
  const hashIndex = href.indexOf("#");
  return hashIndex === -1 ? undefined : href.slice(hashIndex + 1);
};

/**
Desktop main navigation wrapped in ReUI `Scrollspy` so the active homepage
section receives a calm Botanical Eucalyptus indicator as visitors scroll,
while dedicated routes like `/evaluate` highlight their matching route link.
*/
export const HeaderNav = (): ReactNode => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav aria-label="Main" className="hidden md:block">
      <Scrollspy isActiveOnRoute={isHome} offset={136}>
        <ul className="flex items-center gap-0.5 lg:gap-1">
          {navigationLinks.map((link) => {
            const anchorId = getSectionAnchorId(link.href);
            const isActiveRoute = !anchorId && pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch={!anchorId}
                  data-scrollspy-anchor={isHome ? anchorId : undefined}
                  data-active={isActiveRoute ? "true" : undefined}
                  aria-current={isActiveRoute ? "page" : undefined}
                  className={cn(
                    "nav-scrollspy-link text-foreground/82 focus-visible:ring-ring focus-visible:ring-offset-background relative inline-flex min-h-10 items-center rounded-md px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent lg:px-3.5 [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
                    "data-[active=true]:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </Scrollspy>
    </nav>
  );
};

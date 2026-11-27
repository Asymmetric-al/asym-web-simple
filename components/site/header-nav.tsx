"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scrollspy } from "@/components/site/reui/scrollspy";
import { navigationLinks } from "@/lib/config";
import type { ReactNode } from "react";

const getSectionAnchorId = (href: string): string | undefined => {
  const hashIndex = href.indexOf("#");
  return hashIndex === -1 ? undefined : href.slice(hashIndex + 1);
};

export const HeaderNav = (): ReactNode => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav aria-label="Main" className="hidden md:block">
      <Scrollspy
        isActiveOnRoute={isHome}
        offset={136}
        minWidthMedia="(min-width: 768px)"
      >
        <ul className="flex items-center gap-0.5 lg:gap-1">
          {navigationLinks.map((link) => {
            const anchorId = getSectionAnchorId(link.href);
            const isActiveRoute = !anchorId && pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch={false}
                  data-scrollspy-anchor={anchorId}
                  data-active={isActiveRoute ? "true" : undefined}
                  aria-current={isActiveRoute ? "page" : undefined}
                  className="nav-scrollspy-link text-foreground/82 focus-visible:ring-ring focus-visible:ring-offset-background data-[active=true]:text-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground relative inline-flex min-h-10 items-center rounded-md px-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent lg:px-3.5"
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

import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

/** Inline brand mark: asymmetric “A” for Asymmetric.al (navy stroke, inherits `currentColor`). */
export function SiteLogoMark({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden
      {...props}
    >
      <path
        d="M6 19L11 5M18 19L12.5 5M8.5 13.5h7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

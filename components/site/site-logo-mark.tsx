import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

/** Transparent Asym mark with explicit light/dark artwork. */
export function SiteLogoMark({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn("relative inline-block shrink-0", className)}
      aria-hidden="true"
      {...props}
    >
      <Image
        src="/brand/asym-mark-dark.png"
        alt=""
        fill
        priority
        sizes="24px"
        className="object-contain dark:hidden"
      />
      <Image
        src="/brand/asym-mark-light.png"
        alt=""
        fill
        priority
        sizes="24px"
        className="hidden object-contain dark:block"
      />
    </span>
  );
}

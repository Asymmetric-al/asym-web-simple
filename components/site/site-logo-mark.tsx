import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

type SiteLogoMarkProps = ComponentPropsWithoutRef<"span"> & {
  imageSizes?: string;
  priority?: boolean;
};

/** Transparent Asym mark with explicit light/dark artwork. */
export function SiteLogoMark({
  className,
  imageSizes = "24px",
  priority = false,
  ...props
}: SiteLogoMarkProps) {
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
        priority={priority}
        sizes={imageSizes}
        className="object-contain dark:hidden"
      />
      <Image
        src="/brand/asym-mark-light.png"
        alt=""
        fill
        priority={priority}
        sizes={imageSizes}
        className="hidden object-contain dark:block"
      />
    </span>
  );
}

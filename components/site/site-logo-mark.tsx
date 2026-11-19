import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

type SiteLogoMarkProps = ComponentPropsWithoutRef<"span"> & {
  readonly size?: number;
  readonly eager?: boolean;
  readonly priority?: boolean;
};

/**
Transparent asym mark with explicit light/dark artwork and fixed intrinsic dimensions.
*/
export const SiteLogoMark = ({
  className,
  size = 24,
  eager = false,
  priority = false,
  ...props
}: SiteLogoMarkProps) => {
  let loading: "eager" | undefined;
  if (!priority && eager) {
    loading = "eager";
  }

  return (
    <span
      className={cn("relative inline-flex shrink-0 items-center", className)}
      aria-hidden="true"
      {...props}
    >
      <Image
        src="/brand/asym-mark-dark.png"
        alt=""
        width={size}
        height={size}
        priority={priority}
        loading={loading}
        className="size-full object-contain dark:hidden"
      />
      <Image
        src="/brand/asym-mark-light.png"
        alt=""
        width={size}
        height={size}
        priority={priority}
        loading={loading}
        className="hidden size-full object-contain dark:block"
      />
    </span>
  );
};

import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export const Container = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "mx-auto w-full max-w-[82rem] px-4 sm:px-6 lg:px-8",
      className
    )}
    {...props}
  />
);

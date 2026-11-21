import * as React from "react";

import { cn } from "@/lib/utils";

const Input = ({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) => (
  <input
    type={type}
    data-slot="input"
    className={cn(
      "border-input bg-background/85 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:bg-background focus-visible:ring-ring/85 aria-invalid:border-destructive aria-invalid:ring-destructive/30 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive aria-invalid:focus-visible:ring-offset-background [@media(hover:hover)_and_(pointer:fine)]:hover:border-foreground/75 h-11 w-full min-w-0 rounded-md border px-3.5 py-2 text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-[border-color,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:ring-2 focus-visible:outline-2 focus-visible:outline-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-2 aria-invalid:focus-visible:ring-offset-2 md:text-sm",
      className
    )}
    {...props}
  />
);

export { Input };

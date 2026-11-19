import * as React from "react";

import { cn } from "@/lib/utils";

const Input = ({ className, type, ...props }: React.ComponentProps<"input">) => (
  <input
    type={type}
    data-slot="input"
    className={cn(
      "border-input bg-background/85 file:text-foreground placeholder:text-muted-foreground hover:border-foreground/65 focus-visible:border-ring focus-visible:bg-background focus-visible:ring-ring/85 aria-invalid:border-destructive aria-invalid:ring-destructive/30 h-11 w-full min-w-0 rounded-full border px-4 py-2 text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-[border-color,background-color] duration-150 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:outline-2 focus-visible:outline-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-2 md:text-sm",
      className
    )}
    {...props}
  />
);

export { Input };

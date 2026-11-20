import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = ({
  className,
  ...props
}: React.ComponentProps<"textarea">) => (
  <textarea
    data-slot="textarea"
    className={cn(
      "border-input bg-background/85 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:bg-background focus-visible:ring-ring/85 aria-invalid:border-destructive aria-invalid:ring-destructive/30 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive aria-invalid:focus-visible:ring-offset-background [@media(hover:hover)_and_(pointer:fine)]:hover:border-foreground/65 flex field-sizing-content max-h-[min(22rem,50svh)] min-h-32 w-full resize-y overflow-y-auto rounded-[1.35rem] border px-4 py-3 text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-[border-color,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:ring-2 focus-visible:outline-2 focus-visible:outline-transparent disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-2 aria-invalid:focus-visible:ring-offset-2 supports-[field-sizing:content]:resize-none md:text-sm",
      className
    )}
    {...props}
  />
);

export { Textarea };

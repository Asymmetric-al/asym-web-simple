import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = ({
  className,
  ...props
}: React.ComponentProps<"textarea">) => (
  <textarea
    data-slot="textarea"
    className={cn(
      "border-input bg-background/85 placeholder:text-muted-foreground hover:border-foreground/65 focus-visible:border-ring focus-visible:bg-background focus-visible:ring-ring/85 aria-invalid:border-destructive aria-invalid:ring-destructive/30 flex field-sizing-content min-h-32 w-full resize-y rounded-[1.35rem] border px-4 py-3 text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-[border-color,background-color] duration-150 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-2 md:text-sm",
      className
    )}
    {...props}
  />
);

export { Textarea };

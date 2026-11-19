import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input bg-background/76 placeholder:text-muted-foreground/90 hover:border-foreground/14 focus-visible:border-ring focus-visible:bg-background focus-visible:ring-ring/45 aria-invalid:border-destructive aria-invalid:ring-destructive/20 flex field-sizing-content min-h-32 w-full resize-y rounded-[1.35rem] border px-4 py-3 text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] transition-[border-color,box-shadow,background-color] duration-200 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-[3px] md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };

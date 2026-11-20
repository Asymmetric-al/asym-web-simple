import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "group/button focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-offset-background aria-invalid:border-destructive aria-invalid:ring-destructive/30 inline-flex max-w-full min-w-0 items-center justify-center gap-2 rounded-full border border-transparent bg-clip-padding text-center text-sm font-medium text-pretty whitespace-normal transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:self-center [&_svg]:transition-transform [&_svg]:duration-150 [&_svg]:ease-[cubic-bezier(0.23,1,0.32,1)] [&_svg:not([class*='size-'])]:size-4 [@media(hover:hover)_and_(pointer:fine)]:hover:[&_svg[data-icon=inline-end]]:translate-x-0.5",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground bg-clip-border font-semibold shadow-[inset_0_1px_0_rgb(255_255_255/18%),inset_0_-1px_0_rgb(18_32_43/24%),0_14px_32px_-20px_rgb(179_58_34/52%)] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-primary/92 dark:shadow-[inset_0_1px_0_rgb(255_255_255/32%),inset_0_-1px_0_rgb(11_19_26/22%),0_14px_32px_-20px_rgb(0_0_0/75%)]",
        ink: "bg-foreground text-background bg-clip-border font-semibold shadow-sm [@media(hover:hover)_and_(pointer:fine)]:hover:bg-foreground/90",
        outline:
          "border-input bg-card text-foreground shadow-xs [@media(hover:hover)_and_(pointer:fine)]:hover:bg-secondary",
        ghost:
          "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-muted [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground",
      },
      size: {
        default:
          "min-h-11 px-4 py-2 leading-[1.15] has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 sm:min-h-10",
        lg: "min-h-11 px-5 py-2.5 text-[0.9375rem] leading-[1.15]",
        "icon-sm": "size-11 shrink-0 sm:size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

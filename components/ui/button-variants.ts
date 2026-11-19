import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "group/button focus-visible:border-ring focus-visible:ring-ring/45 aria-invalid:border-destructive aria-invalid:ring-destructive/20 inline-flex max-w-full min-w-0 items-center justify-center gap-2 rounded-full border border-transparent bg-clip-padding text-center text-sm font-medium text-pretty whitespace-normal transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out outline-none select-none focus-visible:ring-[3px] active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-[3px] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:self-center [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/88 shadow-[0_18px_44px_-28px_rgba(30,58,79,0.78)]",
        outline:
          "border-border bg-background/72 text-foreground hover:bg-secondary/68 aria-expanded:bg-secondary/72 aria-expanded:text-foreground shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/84 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground shadow-sm",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/92 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 shadow-[0_18px_44px_-30px_rgba(201,72,55,0.55)]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "min-h-10 px-4 py-2 leading-[1.15] has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "min-h-7 px-2.5 py-1 text-xs leading-[1.15] [&_svg:not([class*='size-'])]:size-3",
        sm: "min-h-9 px-3.5 py-2 leading-[1.15]",
        lg: "min-h-11 px-5 py-2.5 text-[0.95rem] leading-[1.15]",
        icon: "size-10 shrink-0",
        "icon-xs": "size-6 shrink-0 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9 shrink-0",
        "icon-lg": "size-11 shrink-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

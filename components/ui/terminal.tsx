import * as React from "react";
import { cn } from "@/lib/utils";

export const SpotlightCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative overflow-hidden rounded-2xl", className)} {...props} />
));
SpotlightCard.displayName = "SpotlightCard";

export const TechPanel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { title?: string }
>(({ className, title, children, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-2xl border border-border p-6", className)} {...props}>
    {title && <div className="mb-4 text-sm font-mono uppercase tracking-wider text-muted-foreground">{title}</div>}
    {children}
  </div>
));
TechPanel.displayName = "TechPanel";

export const ScrambleText = ({ text, delay = 0 }: { text: string; delay?: number }) => (
  <span style={{ animationDelay: `${delay}ms` }} className="inline-block">
    {text}
  </span>
);

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
>(({ className, label, ...props }, ref) => (
  <div className="space-y-2">
    {label && <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{label}</label>}
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
));
Input.displayName = "Input";

export const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }
>(({ className, label, ...props }, ref) => (
  <div className="space-y-2">
    {label && <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{label}</label>}
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
));
TextArea.displayName = "TextArea";

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { icon?: React.ReactNode }
>(({ className, icon, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    {icon && <span className="ml-2">{icon}</span>}
  </button>
));
Button.displayName = "Button";
"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex flex-col gap-2 data-[orientation=vertical]:flex-row",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-full min-w-0 items-center justify-center rounded-[1.15rem] border border-border/65 bg-card/76 p-1 text-muted-foreground shadow-[0_16px_40px_-32px_rgba(22,33,43,0.45)] backdrop-blur-sm group-data-horizontal/tabs:h-auto group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col group-data-vertical/tabs:rounded-2xl data-[variant=line]:rounded-none data-[variant=line]:border-none data-[variant=line]:bg-transparent data-[variant=line]:p-0 data-[variant=line]:shadow-none",
  {
    variants: {
      variant: {
        default: "",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>
>(function TabsList({ className, variant = "default", ...props }, ref) {
  return (
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
})
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Tab>,
  TabsPrimitive.Tab.Props
>(function TabsTrigger({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Tab
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(
        "relative flex min-h-10 max-w-full min-w-0 flex-1 items-center justify-center gap-1.5 rounded-[0.95rem] border border-transparent px-3 py-2 text-center text-sm font-medium whitespace-normal text-foreground/64 transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start group-data-vertical/tabs:px-3.5 group-data-vertical/tabs:py-2.5 hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/45 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:self-center [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent group-data-[variant=line]/tabs-list:data-active:border-transparent",
        "data-active:border-border/60 data-active:bg-background/92 data-active:text-foreground data-active:shadow-[0_14px_30px_-22px_rgba(22,33,43,0.36)]",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      {...props}
    />
  )
})
TabsTrigger.displayName = "TabsTrigger"

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import {cn} from "@/lib/utils.ts";
import { cva, type VariantProps } from "class-variance-authority";

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva(
  "inline-flex items-center justify-center gap-1 p-1 text-secondary",
  {
    variants: {
      type: {
        default: "",
        segmented: "bg-item-tertiary [&>button]:data-[state=active]:shadow-sm",
        line: "[&>button]:data-[state=active]:after:absolute [&>button]:data-[state=active]:after:-bottom-1.5 [&>button]:data-[state=active]:after:content-['']  [&>button]:data-[state=active]:after:w-full [&>button]:data-[state=active]:after:h-0.5 [&>button]:data-[state=active]:after:bg-primary",
      },
      variant: {
        default: "[&>button]:data-[state=active]:bg-background",
        soft: "[&>button]:data-[state=active]:bg-item-tertiary [&>button]:data-[state=active]:border [&>button]:data-[state=active]:border-alpha-strong",
      },
      rounded: {
        default: "rounded-md [&>button]:rounded-md",
        pill: "rounded-full [&>button]:rounded-full",
      },
    },
    defaultVariants: {
      type: "default",
      variant: "default",
      rounded: "default",
    },
  },
);

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {
  full?: boolean;
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, rounded, variant, type, full, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      full && "!flex",
      tabsListVariants({ rounded, variant, type, className }),
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex h-7 flex-1 box-border relative items-center justify-center whitespace-nowrap px-3 py-1 text-body-xs-medium transition-all focus:border !border-item-primary outline-none focus:ring-item-primary-focus focus:ring-2 disabled:pointer-events-none disabled:opacity-50 hover:!bg-item-tertiary-hover hover:text-primary data-[state=active]:text-primary",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

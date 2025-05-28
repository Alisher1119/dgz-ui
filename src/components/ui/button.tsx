import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import {cn} from "@/lib/utils.ts";

const buttonVariants = cva(
  "inline-flex border border-border-alpha-strong items-center justify-center gap-2 whitespace-nowrap font-medium focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg focus:ring-item-primary-focus transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-item-primary hover:bg-item-primary-hover active:bg-item-primary-active !text-white",
        destructive:
          "bg-item-destructive hover:bg-item-destructive-hover active:bg-item-destructive-active focus:ring-2 focus:ring-item-destructive-focus !text-white",
        secondary:
          "bg-item-secondary hover:bg-item-secondary-hover active:bg-item-secondary-active",
        tertiary:
          "bg-item-tertiary hover:bg-item-tertiary-hover active:bg-item-tertiary-active border-0",
        ghost:
          "bg-item-ghost hover:bg-item-ghost-hover active:bg-item-ghost-active border-0",
      },
      size: {
        lg: "h-12 px-4 text-body-sm-medium [&>svg]:size-5 rounded-5",
        default: "h-10 px-3 text-body-sm-medium [&>svg]:size-5  rounded-4",
        sm: "h-8 px-2.5 text-body-xs-medium [&>svg]:size-4 rounded-3",
        xs: "h-7 px-2 text-body-xs-medium [&>svg]:size-4 rounded-2",
        icon: "h-10 w-10 text-body-xs-medium [&>svg]:size-4 rounded-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

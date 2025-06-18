import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { RiCheckLine, RiSubtractLine } from "@remixicon/react";
import { cn } from "../../lib/utils.ts";

export type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>;

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer size-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-primary",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current size-4")}
    >
      {props.checked === "indeterminate" ? (
        <RiSubtractLine className={"size-3.5 text-primary mb-0.5 mr-0.5"} />
      ) : (
        <RiCheckLine className="size-3.5 text-primary mb-0.5 mr-0.5" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

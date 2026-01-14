import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../../lib';

/**
 * Popover primitives for floating content triggered by another element.
 */
const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

/**
 * PopoverContent - The floating panel that appears near the trigger.
 *
 * @param {object} props - The properties for the component.
 * @param {string} [props.className] - Additional classes for the popover content.
 * @param {'start' | 'center' | 'end'} [props.align='center'] - The alignment of the popover content relative to the trigger.
 * @param {number} [props.sideOffset=4] - The distance between the trigger and the popover content.
 */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md outline-none',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

/**
 * Props aggregation for components that wrap Popover primitives.
 * Useful for high-level components needing to forward props to specific Popover parts.
 */
interface PopoverContainerProps {
  triggerProps?: React.ComponentPropsWithoutRef<typeof PopoverTrigger>;
  contentProps?: React.ComponentPropsWithoutRef<typeof PopoverContent>;
}

export { Popover, PopoverTrigger, PopoverContent, type PopoverContainerProps };

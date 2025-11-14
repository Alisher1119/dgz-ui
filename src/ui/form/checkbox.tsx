import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { RiCheckLine, RiSubtractLine } from '@remixicon/react';
import { cn } from '../../lib';

/**
 * Props for the Checkbox component. Extends Radix Checkbox Root props.
 */
export type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>;

/**
 * Checkbox - An accessible checkbox with indeterminate state support.
 *
 * @component
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer border-primary ring-offset-background focus-visible:ring-ring data-[state=checked]:text-primary size-4 shrink-0 rounded-sm border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex size-4 items-center justify-center text-current')}
    >
      {props.checked === 'indeterminate' ? (
        <RiSubtractLine className={'text-primary mr-0.5 mb-0.5 size-3.5'} />
      ) : (
        <RiCheckLine className="text-primary mr-0.5 mb-0.5 size-3.5" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

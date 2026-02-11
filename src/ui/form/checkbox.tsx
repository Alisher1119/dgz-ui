import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

import { RiCheckLine, RiSubtractLine } from '@remixicon/react';
import { cn } from '../../lib';

/**
 * Props for the Checkbox component. Extends Radix Checkbox Root props.
 * @property {boolean | 'indeterminate'} [checked] - The checked state of the checkbox.
 * @property {boolean} [disabled] - If true, the checkbox will be disabled.
 */
export type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>;

/**
 * Checkbox - An accessible checkbox with indeterminate state support.
 * @returns {JSX.Element} The rendered Checkbox component.
 * @component
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer border-border-alpha-strong ring-offset-background size-4 shrink-0 cursor-pointer rounded-sm border disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:text-primary data-[state=checked]:bg-item-primary',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex size-4 items-center justify-center text-current')}
    >
      {props.checked === 'indeterminate' ? (
        <RiSubtractLine className={'mr-0.5 mb-0.5 size-3.5 text-white'} />
      ) : (
        <RiCheckLine className="mr-0.5 mb-0.5 size-3.5 text-white" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

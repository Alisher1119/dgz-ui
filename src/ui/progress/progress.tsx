import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '../../lib';

/**
 * Progress component - Displays an indicator showing the completion progress of a task.
 * Built on Radix UI Progress primitive.
 *
 * @param className - Additional CSS classes.
 * @param value - The progress value (0-100).
 * @param children - Optional content overlaid on the progress bar.
 * @param props - Other props passed to the root element.
 * @returns {JSX.Element} The rendered Progress component.
 */
function Progress({
  className,
  value,
  children,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'bg-primary/20 relative h-3 w-full overflow-hidden rounded-full',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
      <div
        className={
          'text-body-2xs-semi-bold text-inverted absolute top-0 left-1 leading-3.5'
        }
      >
        {children}
      </div>
    </ProgressPrimitive.Root>
  );
}

export { Progress };

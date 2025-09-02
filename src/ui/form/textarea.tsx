import * as React from 'react';

import type { VariantProps } from 'class-variance-authority';
import { inputVariants } from './input.tsx';
import { cn } from '../../lib/utils.ts';

/**
 * Props for the Textarea component.
 */
export type TextareaProps = React.ComponentProps<'textarea'> &
  VariantProps<typeof inputVariants>;

/**
 * Textarea - Multiline text input with Input variants styling.
 *
 * @component
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'min-h-20 px-3 py-2',
          inputVariants({ variant }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };

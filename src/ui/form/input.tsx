import * as React from 'react';
import { useEffect, useState } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { RiEyeCloseLine, RiEyeLine } from '@remixicon/react';
import { cn } from '../../lib';
import { Button } from '../button';

/**
 * Input style variants using CVA.
 * @property {'default'|'failure'} variant - Visual state of the input.
 */
const inputVariants = cva(
  cn(
    'h-10 w-full rounded-lg px-2.5 py-2 flex border border-border-alpha-strong',
    'placeholder:text-secondary placeholder:text-body-sm-regular disabled:cursor-not-allowed disabled:opacity-50',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-bg focus-visible:ring-offset-2 focus-visible:ring-ring '
  ),
  {
    variants: {
      variant: {
        default: 'focus-visible:ring-item-primary',
        failure:
          'focus-visible:ring-item-destructive placeholder:!text-item-destructive border-item-destructive text-destructive!',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Props for the Input component.
 */
export interface InputProps
  extends React.ComponentProps<'input'>,
    VariantProps<typeof inputVariants> {}

/**
 * Input - Text input with optional password visibility toggle.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    const [isPassword, setIsPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
      setIsPassword(type === 'password');
    }, [type]);
    return (
      <div className={'relative'}>
        <input
          type={!showPassword ? type : 'text'}
          className={cn(
            inputVariants({ variant }),
            className,
            isPassword && 'pr-10'
          )}
          ref={ref}
          {...props}
        />
        {isPassword && (
          <Button
            type={'button'}
            size={'icon'}
            variant={'tertiary'}
            className={
              'absolute top-1 right-1 size-8 cursor-pointer rounded-md p-2 !ring-0 !ring-offset-0'
            }
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
          </Button>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };

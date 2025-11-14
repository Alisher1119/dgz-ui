import * as React from 'react';
import { cn } from '../../lib';

/**
 * CardProps - Native div attributes for the Card container.
 */
export type CardProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Card - A surface component to group related content.
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-4 border-border-alpha-light bg-bg-background border shadow-xs',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

/**
 * CardHeader - Top section typically containing the title and actions.
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-3', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

/**
 * CardTitle - Title area inside the header.
 */
const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-body-md-medium flex items-center justify-between gap-2 [&>div>svg]:size-5 [&>svg]:size-5',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

/**
 * CardDescription - Secondary text under the title.
 */
const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('text-body-sm-regular text-secondary', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

/**
 * CardContent - Main content area of the card.
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-body-sm-regular p-3 pt-0', className)}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

/**
 * CardFooter - Bottom area for actions or summary.
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-body-sm-regular flex items-center p-3 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};

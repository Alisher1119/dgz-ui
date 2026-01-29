import { RiArrowRightSLine } from '@remixicon/react';
import { MoreHorizontal } from 'lucide-react';
import type { ReactNode } from 'react';
import * as React from 'react';
import { cn } from '../../lib';

/**
 * Represents a single breadcrumb item used to build breadcrumb trails.
 *
 * @property {string} path - The URL or path to navigate to.
 * @property {ReactNode} name - Display label for the breadcrumb item.
 * @property {boolean} [isActive] - Marks the current page item.
 */
export interface BreadcrumbInterface {
  path: string;
  name: ReactNode;
  isActive?: boolean;
}

/**
 * Root breadcrumb navigation component. Provides aria-label and forwards ref to a <nav> element.
 *
 * @component
 */
const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<'nav'> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = 'Breadcrumb';

/**
 * Ordered list that lays out breadcrumb items.
 *
 * @component
 */
const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<'ol'>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn('flex flex-wrap items-center gap-1.5 break-words', className)}
    {...props}
  />
));
BreadcrumbList.displayName = 'BreadcrumbList';

/**
 * Single breadcrumb list item container.
 *
 * @component
 */
const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('inline-flex items-center gap-1.5', className)}
    {...props}
  />
));
BreadcrumbItem.displayName = 'BreadcrumbItem';

/**
 * Non-clickable breadcrumb page indicator for the current route.
 * Renders a span with aria-current="page".
 *
 * @component
 */
const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn('text-foreground font-normal', className)}
    {...props}
  />
));
BreadcrumbPage.displayName = 'BreadcrumbPage';

/**
 * Separator element displayed between breadcrumb items.
 * Defaults to a right arrow icon when no children are provided.
 */
const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('text-secondary [&>svg]:size-4', className)}
    {...props}
  >
    {children ?? <RiArrowRightSLine size={20} />}
  </li>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

/**
 * Ellipsis component to indicate collapsed breadcrumb items.
 */
const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis';

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};

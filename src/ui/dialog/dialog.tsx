import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib';
import type { ElementDataType } from '../../types';

/**
 * Dialog primitives for building modal dialogs.
 * Use Dialog as the root, DialogTrigger to open, and DialogContent for the modal body.
 */
const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

/**
 * Full-screen overlay that appears behind the dialog content.
 * @returns {JSX.Element} The rendered DialogOverlay component.
 */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export type DialogContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  /**
   * If true, a close button will be rendered inside the dialog content.
   */
  hasCloseButton?: true;
};

/**
 * The main dialog content container positioned in the viewport center.
 * @returns {JSX.Element} The rendered DialogContent component.
 */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, hasCloseButton, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg',
        className
      )}
      {...props}
    >
      {children}
      {hasCloseButton && (
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

/**
 * Container for dialog header content (title, actions).
 * @returns {JSX.Element} The rendered DialogHeader component.
 */
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

/**
 * Container for dialog footer actions.
 * @returns {JSX.Element} The rendered DialogFooter component.
 */
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

/**
 * DialogTitle - The accessible dialog title.
 * @returns {JSX.Element} The rendered DialogTitle component.
 */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg leading-none font-semibold tracking-tight',
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/**
 * DialogDescription - Additional descriptive text for the dialog.
 * @returns {JSX.Element} The rendered DialogDescription component.
 */
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

/**
 * Props aggregation for components that wrap Dialog primitives.
 * Useful for high-level components needing to forward props to specific Dialog parts.
 */
/**
 * Props aggregation for components that wrap Dialog primitives.
 * Useful for high-level components needing to forward props to specific Dialog parts.
 * @property {React.ComponentPropsWithoutRef<typeof DialogTrigger> & ElementDataType} [triggerProps] - Props for the DialogTrigger component.
 * @property {React.ComponentPropsWithoutRef<typeof DialogContent> & ElementDataType} [contentProps] - Props for the DialogContent component.
 * @property {React.ComponentPropsWithoutRef<typeof DialogClose> & ElementDataType} [closeProps] - Props for the DialogClose component.
 */
interface DialogContainerProps {
  triggerProps?: React.ComponentPropsWithoutRef<typeof DialogTrigger> &
    ElementDataType;
  contentProps?: React.ComponentPropsWithoutRef<typeof DialogContent> &
    ElementDataType;
  closeProps?: React.ComponentPropsWithoutRef<typeof DialogClose> &
    ElementDataType;
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  type DialogContainerProps,
};

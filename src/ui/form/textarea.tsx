import * as React from "react";

import type { VariantProps } from "class-variance-authority";
import { inputVariants } from "./input.tsx";
import { cn } from "../../lib/utils.ts";

export type TextareaProps = React.ComponentProps<"textarea"> &
  VariantProps<typeof inputVariants>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "min-h-20 px-3 py-2",
          inputVariants({ variant }),
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };

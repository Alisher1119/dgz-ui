import styled from 'styled-components';
import { type HTMLAttributes } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib';
import type { ElementDataType } from '../../types';

/**
 * Input style variants using CVA.
 * @property {'default'|'failure'|'success'} variant - Visual state of the input.
 */
const editorVariants = cva(
  'w-full rounded-lg border border-border-alpha-strong dark:bg-transparent file:border-0 placeholder:text-secondary placeholder:text-body-sm-regular focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-bg focus-within:ring-offset-2 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'focus-within:ring-item-primary',
        failure:
          'focus-within:ring-item-destructive bg-item-destructive-focus placeholder:text-item-destructive border-item-destructive text-destructive',
        success:
          'focus-within:ring-success bg-success/20 placeholder:text-success/80 border-success text-success',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const ReactQuillWrapper = styled.div`
  .quill {
    .ql {
      &-toolbar {
        border: none;
      }

      &-editor,
      &-container {
        min-height: 120px;
        border: none;
      }
    }
`;

/**
 * Props for the HtmlEditor component.
 * Extends ReactQuill props and supports the editorVariants for visual states.
 *
 * @property {'default'|'failure'|'success'} [variant='default'] - Visual state of the editor container.
 * @property {HTMLAttributes<HTMLDivElement>} [containerProps] - Props for the outer wrapper div.
 */
type HtmlEditorProps = ReactQuill.ReactQuillProps &
  VariantProps<typeof editorVariants> & {
    containerProps?: HTMLAttributes<HTMLDivElement> & ElementDataType;
  };

/**
 * HtmlEditor - Rich text editor built on react-quill-new with consistent styling.
 *
 * Provides an outer styled container that mirrors Input styles and forwards remaining props
 * to ReactQuill. Use the `variant` prop to indicate success/failure states.
 *
 * @component
 * @param {HtmlEditorProps} props - Component props.
 */
function HtmlEditor({
  containerProps,
  className,
  variant,
  ...props
}: HtmlEditorProps) {
  return (
    <ReactQuillWrapper
      {...containerProps}
      className={cn(editorVariants({ variant }), 'block h-auto p-0', className)}
    >
      <ReactQuill theme="snow" {...props} />
    </ReactQuillWrapper>
  );
}

HtmlEditor.displayName = 'HtmlEditor';

export { HtmlEditor, type HtmlEditorProps };

import styled from 'styled-components';
import 'filepond/dist/filepond.min.css';
import { FilePond, type FilePondProps } from 'react-filepond';

const FilePondContainer = styled.div<{ $invalid: boolean }>`
  .filepond {
    &--drop-label {
      label {
        color: ${({ $invalid }) =>
          $invalid
            ? 'var(--color-item-primary-destructive)'
            : 'inherit'} !important;
      }
    }

    &--root {
      margin-bottom: 0.5rem;
      border-radius: 0.75rem;
    }

    &--panel {
      border-radius: 0.8rem;
      overflow: hidden;

      &-root {
        background-color: transparent;
      }
    }

    &--drip {
      border: 1px solid
        ${({ $invalid }) =>
          $invalid
            ? 'var(--color-item-primary-destructive)'
            : 'var(--color-border-alpha-strong)'};
      background-color: transparent;
      opacity: 1;
      outline-offset: 2px;
      border-radius: 0.75rem;
    }
  }

  &:focus-within {
    .filepond {
      &--drip {
        outline: 2px solid
          ${({ $invalid }) =>
            $invalid
              ? 'var(--color-item-primary-destructive)'
              : 'var(--color-item-primary-primary)'};
      }
    }
  }
`;

type FileUploadProps = FilePondProps & {
  variant?: 'default' | 'failure';
  containerClassName?: string;
};

function FileUpload({
  variant = 'default',
  containerClassName,
  ...props
}: FileUploadProps) {
  return (
    <FilePondContainer
      $invalid={variant === 'failure'}
      className={containerClassName}
    >
      <FilePond credits={false} instantUpload={false} {...props} />
    </FilePondContainer>
  );
}

FileUpload.displayName = 'FileUpload';

export { FileUpload, type FileUploadProps };

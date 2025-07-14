import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Select, { components, type GroupBase } from 'react-select';
import { twMerge } from 'tailwind-merge';
import { get } from 'lodash';
import CreatableSelect, { type CreatableProps } from 'react-select/creatable';

export type Option = {
  label: ReactNode;
  value: string | number;
};

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

export interface ReactSelectProps
  extends Omit<
    CreatableProps<
      Option | Option['value'],
      boolean,
      GroupBase<Option | Option['value']>
    >,
    'options'
  > {
  options: Option[];
  label?: ReactNode;
  containerClassName?: string;
  error?: boolean;
  canAddItem?: boolean;
}

export const ReactSelect = ({
  options = [],
  label,
  required,
  error,
  containerClassName,
  className,
  onChange = () => {},
  placeholder = '',
  canAddItem = false,
  ...computedProps
}: ReactSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<Option | Option[] | null>(
    null
  );
  const [computedOptions, setComputedOptions] = useState<Option[]>([]);
  const Component = useMemo(
    () => (canAddItem ? CreatableSelect : Select),
    [canAddItem]
  );

  useEffect(() => {
    const values: Option | Option[] = [];

    if (computedProps.value instanceof Array) {
      computedProps.value.forEach((value) => {
        let tmpOption: Option | null = null;
        if (
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean'
        ) {
          tmpOption =
            computedOptions.find((option) => value == option.value) || null;
        } else {
          tmpOption = value;
        }
        if (tmpOption) {
          values.push(tmpOption);
        }
      });
      setSelectedValue(values);
    } else if (
      typeof computedProps.value === 'string' ||
      typeof computedProps.value === 'number' ||
      typeof computedProps.value === 'boolean'
    ) {
      setSelectedValue(
        computedOptions.find((option) => computedProps.value == option.value) ||
          null
      );
    } else {
      setSelectedValue(computedProps.value as Option);
    }
  }, [JSON.stringify([computedProps.value, computedOptions])]);

  useEffect(() => {
    setComputedOptions([...options]);
  }, [JSON.stringify(options)]);

  const handleAddItem = useCallback(
    (inputValue: string) => {
      console.log(inputValue);
      if (inputValue) {
        const newOption = createOption(inputValue);
        setComputedOptions((prevOptions) => [newOption, ...prevOptions]);
        setTimeout(() => {
          if (
            computedProps.isMulti &&
            selectedValue &&
            selectedValue instanceof Array
          ) {
            setSelectedValue([...selectedValue, newOption]);
          } else {
            setSelectedValue(newOption);
          }
        }, 500);
      }
    },
    [JSON.stringify(options), selectedValue, canAddItem]
  );

  return (
    <Component
      onCreateOption={handleAddItem}
      components={{
        Control: ({ ...props }) => {
          return (
            <components.Control
              {...props}
              className={twMerge(
                props.className,
                className,
                '!border-border-alpha-strong focus-within:!ring-offset-bg focus-within:!ring-item-primary !min-h-10 !rounded-lg !bg-transparent !ring-0 !outline-none focus-within:!ring-2 focus-within:!ring-offset-2',
                error &&
                  'focus-within:!ring-item-destructive placeholder:!text-item-destructive !border-item-destructive !text-item-destructive'
              )}
            />
          );
        },
        Menu: ({ ...props }) => {
          return (
            <components.Menu
              {...props}
              className={twMerge([props.className, '!bg-bg-secondary'])}
            />
          );
        },
        Option: ({ ...props }) => {
          return (
            <components.Option
              {...props}
              className={twMerge([
                props.className,
                (props.isSelected || props.isFocused) && '!bg-bg',
              ])}
            />
          );
        },
        Placeholder: ({ ...props }) => {
          return (
            <components.Placeholder
              {...props}
              className={twMerge(
                props.className,
                'text-secondary text-body-sm-regular',
                error && '!text-item-destructive'
              )}
            />
          );
        },
        SingleValue: ({ ...props }) => {
          return (
            <components.SingleValue
              {...props}
              className={twMerge([
                props.className,
                'text-body-sm-regular !text-primary',
              ])}
            />
          );
        },
        MultiValue: ({ ...props }) => {
          return (
            <components.MultiValue
              {...props}
              className={twMerge([
                props.className,
                'text-body-sm-regular !rounded-md border-blue-200 !bg-blue-100 !py-0 !text-blue-700',
              ])}
            />
          );
        },
        Input: ({ ...props }) => {
          return (
            <components.Input
              {...props}
              className={twMerge([props.className, '!text-primary'])}
            />
          );
        },
      }}
      placeholder={placeholder}
      className={twMerge('w-full', className)}
      classNamePrefix="selectform"
      isClearable={true}
      hideSelectedOptions={true}
      {...computedProps}
      value={selectedValue}
      options={computedOptions}
      onChange={(values, actionMeta) => {
        if (values instanceof Array) {
          onChange(
            values
              .filter((item) => typeof item === 'object')
              .map((item: Option) => item.value),
            actionMeta
          );
          setSelectedValue(values as Option[]);
        } else {
          onChange(get(values, 'value', null), actionMeta);
          setSelectedValue(values as Option);
        }
      }}
    />
  );
};

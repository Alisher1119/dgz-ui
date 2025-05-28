import Select, {
  components,
  type  ControlProps,
  type MenuProps,
  type MultiValueProps,
  type OptionProps,
  type PlaceholderProps,
  type Props,
  type SingleValueProps,
} from "react-select";
import {twMerge} from "tailwind-merge";

export interface ReactSelectProps
  extends Props {
  error?: boolean;
}

const ReactSelect = ({
  options = [],
  error,
  className,
  // onChange = () => {},
  placeholder = "",
  isSearchable = false,
  ...computedProps
}: ReactSelectProps) => {
  // const [selectedValue, setSelectedValue] = useState<Props['options'] | null>(
  //   null,
  // );

  // useEffect(() => {
  //   const values: Props['options'] = [];
  //
  //   if (computedProps.value instanceof Array) {
  //     computedProps.value.forEach((value) => {
  //       let tmpOption: Props['options'] | null = value;
  //       if (["string", "number"].includes(typeof value)) {
  //         tmpOption = options.find((option) => value == option.value) || null;
  //       }
  //       if (tmpOption) {
  //         values.push(tmpOption);
  //       }
  //     });
  //     setSelectedValue(values);
  //   } else if (["string", "number"].includes(typeof computedProps.value)) {
  //     setSelectedValue(
  //       options.find((option) => computedProps.value == option.value) || null,
  //     );
  //   } else {
  //     setSelectedValue(computedProps.value as Option);
  //   }
  // }, [JSON.stringify([computedProps.value, options])]);

  return (
    <Select
      {...computedProps}
      // value={selectedValue}
      options={options}
      // onChange={(values, actionMeta) => {
      //   if (values instanceof Array) {
      //     onChange(
      //       values.map(({ value }: Option) => value),
      //       actionMeta,
      //     );
      //   } else {
      //     onChange(get(values, "value", null), actionMeta);
      //   }
      //   // @ts-expect-error unknown type
      //   setSelectedValue(values);
      // }}
      components={{
        Control: ({ ...props }: ControlProps) => {
          return (
            <components.Control
              {...props}
              className={twMerge(
                props.className,
                className,
                "!min-h-10 !rounded-lg !bg-transparent !border-border-alpha-strong !outline-none !ring-0 focus-within:!ring-2 focus-within:!ring-offset-bg focus-within:!ring-offset-2 focus-within:!ring-item-primary",
                error &&
                  "focus-within:!ring-item-destructive placeholder:!text-item-destructive !border-item-destructive !text-destructive",
              )}
            />
          );
        },
        Menu: ({ ...props }: MenuProps) => {
          return (
            <components.Menu
              {...props}
              className={twMerge([props.className, "!bg-bg-secondary"])}
            />
          );
        },
        Option: ({ ...props }: OptionProps) => {
          return (
            <components.Option
              {...props}
              className={twMerge([
                props.className,
                (props.isSelected || props.isFocused) && "!bg-bg",
              ])}
            />
          );
        },
        Placeholder: ({ ...props }: PlaceholderProps) => {
          return (
            <components.Placeholder
              {...props}
              className={twMerge(
                props.className,
                "text-secondary text-body-sm-regular",
                error && "!text-item-destructive",
              )}
            />
          );
        },
        SingleValue: ({ ...props }: SingleValueProps) => {
          return (
            <components.SingleValue
              {...props}
              className={twMerge([
                props.className,
                "text-body-sm-regular !text-primary",
              ])}
            />
          );
        },
        MultiValue: ({ ...props }: MultiValueProps) => {
          return (
            <components.MultiValue
              {...props}
              className={twMerge([
                props.className,
                "!py-0 !rounded-md !bg-blue-100 !text-blue-700 border-blue-200 text-body-sm-regular",
              ])}
            />
          );
        },
      }}
      placeholder={placeholder || 'Select'}
      className={twMerge("w-full", className)}
      classNamePrefix="selectform"
      isSearchable={isSearchable}
      isClearable={true}
      hideSelectedOptions={true}
    />
  );
};

export default ReactSelect;

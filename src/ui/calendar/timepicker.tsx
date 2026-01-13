import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { RiTimeLine } from '@remixicon/react';
import { ReactSelect } from '../form';
import { cn } from '../../lib';

/** Hour format token used by TimePicker. */
export const HOUR = 'HH';
/** Minute format token used by TimePicker. */
export const MINUTE = 'mm';
/** Combined time format string (HH:mm). */
export const TIME = `${HOUR}:${MINUTE}`;

/** Internal time state used by the picker. */
export interface TimeState {
  hour: string;
  minute: string;
}

/**
 * Props for the TimePicker component.
 * @property {string} [value] - Time in HH:MM format.
 * @property {(time: string) => void} [onChange] - Called with new HH:MM on change.
 * @property {boolean} [disabled=false] - Disables selection.
 * @property {string} [className] - Additional classes for container.
 * @property {ReactNode} [icon] - Optional leading icon.
 */
export interface TimePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  onChange?: (time: string) => void;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
}

/**
 * TimePicker - Hour/minute selector that emits time as HH:MM string.
 *
 * @component
 */
export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value,
      onChange,
      disabled = false,
      className,
      icon = <RiTimeLine className="size-5" />,
      ...props
    },
    ref
  ) => {
    const parseTime = (timeValue?: string): TimeState | undefined => {
      if (typeof timeValue === 'string') {
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
        const match = timeValue.match(timeRegex);
        if (match) {
          return {
            hour: match[1].padStart(2, '0'),
            minute: match[2],
          };
        }
      }

      return;
    };

    const [timeState, setTimeState] = useState<TimeState>({
      hour: '',
      minute: '',
    });

    // Update internal state when value prop changes
    useEffect(() => {
      const time = parseTime(value);
      if (time) {
        setTimeState(time);
      }
    }, [value]);

    const handleSelectChange = (
      newValue: string,
      type: keyof TimeState
    ): void => {
      const newTimeState = { ...timeState, [type]: newValue };
      setTimeState(newTimeState);

      // Create time string in HH:MM format
      const timeString = `${newTimeState.hour}:${newTimeState.minute}`;

      // Call onChange with the new time string
      if (onChange) {
        onChange(timeString);
      }
    };

    const hourOptions = useMemo(
      () =>
        Array.from({ length: 24 }, (_, i) => {
          const val = String(i).padStart(2, '0');
          return { value: val, label: val };
        }),
      []
    );

    const minuteOptions = useMemo(
      () =>
        Array.from({ length: 60 }, (_, i) => {
          const val = String(i).padStart(2, '0');
          return { value: val, label: val };
        }),
      []
    );

    return (
      <div
        {...props}
        className={cn('flex items-center space-x-2', className)}
        ref={ref}
      >
        {icon}
        <div className={cn('flex items-center space-x-2')}>
          <ReactSelect
            isClearable={false}
            options={hourOptions}
            value={timeState.hour}
            onChange={(opt) => handleSelectChange(`${opt}`, 'hour')}
            isDisabled={disabled}
            placeholder={'HH'}
            menuPlacement={'auto'}
            className={'min-w-20'}
          />
          <span className="text-lg">:</span>

          <ReactSelect
            isClearable={false}
            options={minuteOptions}
            value={timeState.minute}
            onChange={(opt) => handleSelectChange(`${opt}`, 'minute')}
            isDisabled={disabled}
            placeholder={'mm'}
            menuPlacement={'auto'}
            className={'min-w-20'}
          />
        </div>
      </div>
    );
  }
);

TimePicker.displayName = 'TimePicker';

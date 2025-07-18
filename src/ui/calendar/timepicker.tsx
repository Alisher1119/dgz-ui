import {
  forwardRef,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { RiTimeLine } from '@remixicon/react';
import { ReactSelect } from '../form';
import { cn } from '../../lib/utils.ts';

export const HOUR = 'HH';
export const MINUTE = 'mm';
export const TIME = `${HOUR}:${MINUTE}`;

export interface TimeState {
  hour: string;
  minute: string;
}

export interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
}

// Base TimePicker component that works with string format
export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value,
      onChange,
      disabled = false,
      className,
      icon = <RiTimeLine className="size-5" />,
    },
    ref
  ) => {
    // Parse the time value from string format
    const parseTime = (timeValue?: string): TimeState => {
      // If timeValue is a valid string in HH:MM format
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

      // Default to current time if no valid value
      const now = new Date();
      return {
        hour: now.getHours().toString().padStart(2, '0'),
        minute: now.getMinutes().toString().padStart(2, '0'),
      };
    };

    const { hour, minute } = parseTime(value);

    const [timeState, setTimeState] = useState<TimeState>({
      hour,
      minute,
    });

    // Update internal state when value prop changes
    useEffect(() => {
      const { hour, minute } = parseTime(value);
      setTimeState({ hour, minute });
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
      <div className={cn('flex items-center space-x-2', className)} ref={ref}>
        {icon}
        <div className={cn('flex items-center space-x-2')}>
          <ReactSelect
            isClearable={false}
            options={hourOptions}
            value={timeState.hour}
            onChange={(opt) => handleSelectChange(`${opt}`, 'hour')}
            isDisabled={disabled}
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
            menuPlacement={'auto'}
            className={'min-w-20'}
          />
        </div>
      </div>
    );
  }
);

TimePicker.displayName = 'TimePicker';

import { forwardRef, useEffect, useMemo, useState } from "react";
import { Dayjs } from "dayjs";
import { RiTimeLine } from "@remixicon/react";
import * as dayjs from "dayjs";
import { ReactSelect } from "../form";
import { cn } from "../../lib/utils.ts";

export const HOUR = "HH";
export const MINUTE = "mm";
export const TIME = `${HOUR}:${MINUTE}`;

export interface TimeState {
  hour: string;
  minute: string;
}

export interface TimePickerProps {
  value?: string | Dayjs;
  onChange?: (time: Dayjs) => void;
  disabled?: boolean;
  className?: string;
}

// Base TimePicker component that doesn't depend on React Hook Form
export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  ({ value, onChange, disabled = false, className }, ref) => {
    // Parse the time value using dayjs
    const parseTime = (timeValue?: string | Dayjs): TimeState => {
      // If timeValue is a valid dayjs object, use it
      if (dayjs.isDayjs(timeValue) && timeValue.isValid()) {
        return {
          hour: timeValue.format(HOUR),
          minute: timeValue.format(MINUTE),
        };
      }

      // If timeValue is a string in HH:MM format
      if (typeof timeValue === "string") {
        const timeDayjs = dayjs(timeValue, TIME);
        if (timeDayjs.isValid()) {
          return {
            hour: timeDayjs.format(HOUR),
            minute: timeDayjs.format(MINUTE),
          };
        }
      }

      // Default to current time if no valid value
      const now = dayjs();
      return {
        hour: now.format(HOUR),
        minute: now.format(MINUTE),
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
      console.log(hour, minute);
      setTimeState({ hour, minute });
    }, [value]);

    const handleSelectChange = (
      newValue: string,
      type: keyof TimeState,
    ): void => {
      const newTimeState = { ...timeState, [type]: newValue };
      setTimeState(newTimeState);

      // Create a dayjs object with the selected time
      const timeDayjs = dayjs()
        .hour(parseInt(newTimeState.hour, 10))
        .minute(parseInt(newTimeState.minute, 10))
        .second(0);

      // Call onChange with the new dayjs object
      if (onChange) {
        onChange(timeDayjs);
      }
    };

    const hourOptions = useMemo(
      () =>
        Array.from({ length: 24 }, (_, i) => {
          const val = String(i).padStart(2, "0");
          return { value: val, label: val };
        }),
      [],
    );

    const minuteOptions = useMemo(
      () =>
        Array.from({ length: 60 }, (_, i) => {
          const val = String(i).padStart(2, "0");
          return { value: val, label: val };
        }),
      [],
    );

    return (
      <div className={cn("flex items-center space-x-2", className)} ref={ref}>
        <RiTimeLine className="size-5" />
        <div className={cn("flex items-center space-x-2")}>
          <ReactSelect
            isClearable={false}
            options={hourOptions}
            value={timeState.hour}
            onChange={(opt) => handleSelectChange(`${opt}`, "hour")}
            isDisabled={disabled}
            menuPlacement={"auto"}
            className={"min-w-20"}
          />
          <span className="text-lg">:</span>

          <ReactSelect
            isClearable={false}
            options={minuteOptions}
            value={timeState.minute}
            onChange={(opt) => handleSelectChange(`${opt}`, "minute")}
            isDisabled={disabled}
            menuPlacement={"auto"}
            className={"min-w-20"}
          />
        </div>
      </div>
    );
  },
);

TimePicker.displayName = "TimePicker";

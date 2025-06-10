import { type ButtonHTMLAttributes, useEffect, useState } from "react";
import {
  DayButton,
  DayPicker,
  type DayPickerProps,
  Weekday,
} from "react-day-picker";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../form";
import { twMerge } from "tailwind-merge";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { cn } from "../../lib/utils.ts";
import { Button, buttonVariants } from "../button";
import * as dayjs from "dayjs";

type CalendarProps = DayPickerProps & {
  selectedFromDate?: Date;
  selectedToDate?: Date;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  selectedToDate,
  selectedFromDate,
  ...props
}: CalendarProps) {
  const [month, setMonth] = useState<Date>(new Date());

  useEffect(() => {
    // @ts-expect-error prop exists
    setMonth(props.selected);
    // @ts-expect-error prop exists
  }, [props.selected]);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 ", className)}
      classNames={{
        years_dropdown: "flex",
        months: "flex relative gap-2",
        month: "flex flex-col gap-4 text-center",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1 w-full absolute justify-between border-b pb-2",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-neutral-500 rounded-md w-8 font-normal text-[0.8rem] dark:text-neutral-400 ",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-neutral-100 [&:has([aria-selected].day-range-end)]:rounded-r-md dark:[&:has([aria-selected])]:bg-neutral-800",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "table-cell size-8 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_start:
          "day-range-start aria-selected:bg-neutral-900 aria-selected:text-neutral-50 dark:aria-selected:bg-neutral-50 dark:aria-selected:text-neutral-900",
        day_range_end:
          "day-range-end aria-selected:bg-neutral-900 aria-selected:text-neutral-50 dark:aria-selected:bg-neutral-50 dark:aria-selected:text-neutral-900",
        day_selected:
          "bg-neutral-900 text-neutral-50 hover:bg-neutral-900 hover:text-neutral-50 focus:bg-neutral-900 focus:text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 dark:focus:bg-neutral-50 dark:focus:text-neutral-900",
        day_today:
          "bg-neutral-100 text-red-900 dark:bg-neutral-800 dark:text-neutral-50",
        day_outside:
          "day-outside text-neutral-500 aria-selected:text-neutral-500 dark:text-neutral-400 dark:aria-selected:text-neutral-400",
        day_disabled: "text-neutral-500 opacity-50 dark:text-neutral-400",
        day_range_middle:
          "aria-selected:bg-neutral-100 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      month={month}
      components={{
        Weekday: ({ ...props }) => (
          <Weekday
            {...props}
            className={"text-body-xs-medium text-tertiary dark:text-primary"}
          />
        ),
        DayButton: ({ day, modifiers, ...props }) => {
          return (
            <DayButton
              day={day}
              modifiers={modifiers}
              {...props}
              className={twMerge(
                "size-7 rounded-sm cursor-pointer",
                (modifiers.today ||
                  (selectedFromDate &&
                    selectedFromDate <= day.date &&
                    selectedToDate &&
                    selectedToDate >= day.date)) &&
                  "bg-item-tertiary text-item-primary",
                modifiers.selected &&
                  "bg-item-primary text-white dark:text-primary",
                modifiers.disabled && "opacity-50 pointer-events-none",
              )}
            />
          );
        },
        MonthCaption: ({ ...props }) => {
          const currentDate = dayjs(props.calendarMonth.date);
          return (
            <div className={"flex justify-center gap-1 mx-auto z-10"}>
              <Select
                onValueChange={(month: string) =>
                  setMonth(dayjs(currentDate).month(parseInt(month)).toDate())
                }
              >
                <SelectTrigger className={"max-w-[60px] max-h-6 "}>
                  {currentDate.format("MMM")}
                </SelectTrigger>
                <SelectContent className={"max-w-10"}>
                  {new Array(12).fill(1).map((_val, index) => (
                    <SelectItem
                      className={"py-0.5 px-3"}
                      key={index}
                      value={`${index}`}
                    >
                      {dayjs(new Date(2025, index, 1)).format("MMMM")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                onValueChange={(month: string) =>
                  setMonth(dayjs(currentDate).year(parseInt(month)).toDate())
                }
              >
                <SelectTrigger className={"max-w-[70px] max-h-6 mx-auto"}>
                  {dayjs(props.calendarMonth.date).format("YYYY")}
                </SelectTrigger>
                <SelectContent>
                  {new Array(10).fill(1).map((_val, index) => {
                    const year = new Date().getFullYear() - index;
                    return (
                      <SelectItem
                        className={"py-0.5 px-3"}
                        key={index}
                        value={`${year}`}
                      >
                        {year}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          );
        },
        NextMonthButton: ({
          className,
          ...props
        }: ButtonHTMLAttributes<HTMLButtonElement>) => (
          <Button
            variant={"ghost"}
            className={cn("size-6", className)}
            {...props}
            onClick={() => setMonth(dayjs(month).add(1, "M").toDate())}
          >
            <RiArrowRightSLine />
          </Button>
        ),
        PreviousMonthButton: ({
          className,
          ...props
        }: ButtonHTMLAttributes<HTMLButtonElement>) => (
          <Button
            variant={"ghost"}
            className={cn("size-6", className)}
            {...props}
            onClick={() => setMonth(dayjs(month).subtract(1, "M").toDate())}
          >
            <RiArrowLeftSLine />
          </Button>
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };

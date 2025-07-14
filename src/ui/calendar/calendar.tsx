import {
  type ButtonHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  DayButton,
  DayPicker,
  type PropsBase,
  type PropsSingle,
  Weekday,
} from 'react-day-picker';
import { twMerge } from 'tailwind-merge';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import { Button, buttonVariants } from 'dgz-ui';
import dayjs from 'dayjs';
import { cn } from '../../lib/utils.ts';

export const DATE = 'DD.MM.YYYY';

export type CalendarProps = PropsBase &
  PropsSingle & {
    selectedFromDate?: Date;
    selectedToDate?: Date;
  };

export interface MonthCaptionProps {
  calendarMonth: { date: Date };
  setMonth: (date: Date) => void;
}

const MonthCaption = ({ calendarMonth, setMonth }: MonthCaptionProps) => {
  const currentDate = dayjs(calendarMonth.date);
  const [isMonthSelect, setIsMonthSelect] = useState(false);
  const [isYearSelect, setIsYearSelect] = useState(false);
  const [yearItemsLimit] = useState(20);
  const [yearPosition, setYearPosition] = useState(0);
  const handleMonthChange = useCallback(
    (month: string) => {
      setIsMonthSelect(false);
      setMonth(dayjs(currentDate).month(parseInt(month)).toDate());
    },
    [currentDate, setMonth]
  );

  const handleYearChange = useCallback(
    (year: string) => {
      setIsYearSelect(false);
      setMonth(dayjs(currentDate).year(parseInt(year)).toDate());
    },
    [currentDate, setMonth]
  );

  return (
    <div className={'z-10 mx-auto flex justify-center gap-1'}>
      <Button
        size={'xs'}
        variant={'secondary'}
        className={'max-h-6 max-w-[60px]'}
        onClick={() => setIsMonthSelect(true)}
      >
        {currentDate.format('MMM')}
      </Button>
      {isMonthSelect && (
        <div
          className={'bg-bg absolute -inset-1 flex flex-col items-center gap-2'}
        >
          <div className={'flex items-center justify-between gap-2'}>
            <span>Month</span>
          </div>
          <div className={'grid grid-cols-3 gap-2'}>
            {Array.from({ length: 12 }, (_, i) => (
              <Button
                onClick={() => handleMonthChange(i.toString())}
                key={i}
                size={'sm'}
                variant={i === currentDate.month() ? 'default' : 'secondary'}
              >
                {dayjs().month(i).format('MMMM')}
              </Button>
            ))}
          </div>
        </div>
      )}
      <Button
        size={'xs'}
        variant={'secondary'}
        className={'max-h-6 max-w-[60px]'}
        onClick={() => setIsYearSelect(true)}
      >
        {currentDate.format('YYYY')}
      </Button>
      {isYearSelect && (
        <div className={'bg-bg absolute -inset-1 flex flex-col gap-2'}>
          <div className={'flex items-center justify-between gap-2'}>
            <Button
              size={'xs'}
              variant={'secondary'}
              onClick={() => setYearPosition(yearPosition - 1)}
            >
              <RiArrowLeftSLine />
            </Button>
            <span>Year</span>
            <Button
              size={'xs'}
              variant={'secondary'}
              onClick={() => setYearPosition(yearPosition + 1)}
            >
              <RiArrowRightSLine />
            </Button>
          </div>
          <div className={'grid w-full grid-cols-4 gap-2'}>
            {Array.from({ length: yearItemsLimit }, (_, i) => {
              const year =
                Math.floor(currentDate.year() / yearItemsLimit) *
                  yearItemsLimit +
                yearPosition * yearItemsLimit +
                i;
              return (
                <Button
                  onClick={() => handleYearChange(year.toString())}
                  key={i}
                  size={'xs'}
                  variant={
                    year === currentDate.year() ? 'default' : 'secondary'
                  }
                >
                  {dayjs().year(year).format('YYYY')}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  selectedToDate,
  selectedFromDate,
  ...props
}: CalendarProps) {
  const [month, setMonth] = useState<Date>(dayjs().startOf('month').toDate());

  // Memoized weekday component
  const MemoizedWeekday = useCallback(
    (props: Parameters<typeof Weekday>[0]) => (
      <Weekday
        {...props}
        className={'text-body-xs-medium text-tertiary dark:text-primary'}
      />
    ),
    []
  );

  const MemoizedMonthCaption = useCallback(
    (captionProps: { calendarMonth: { date: Date } }) => (
      <MonthCaption
        calendarMonth={captionProps.calendarMonth}
        setMonth={setMonth}
      />
    ),
    [] // Fixed dependency array
  );

  // Memoized DayButton component
  const MemoizedDayButton = useCallback(
    (dayButtonProps: Parameters<typeof DayButton>[0]) => {
      const { day, modifiers, ...rest } = dayButtonProps;
      return (
        <DayButton
          day={day}
          modifiers={modifiers}
          {...rest}
          className={twMerge(
            'size-7 cursor-pointer rounded-sm',
            (modifiers.today ||
              (selectedFromDate &&
                selectedFromDate <= day.date &&
                selectedToDate &&
                selectedToDate >= day.date)) &&
              'bg-item-tertiary text-item-primary',
            modifiers.selected &&
              'bg-item-primary dark:text-primary text-white',
            modifiers.disabled && 'pointer-events-none opacity-50'
          )}
        />
      );
    },
    [selectedFromDate, selectedToDate]
  );

  // Memoized navigation handlers
  const handlePrevMonth = useCallback(
    () => setMonth((prev) => dayjs(prev).subtract(1, 'M').toDate()),
    []
  );

  const handleNextMonth = useCallback(
    () => setMonth((prev) => dayjs(prev).add(1, 'M').toDate()),
    []
  );

  // Memoized navigation buttons
  const MemoizedPrevButton = useCallback(
    ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
      <Button
        variant={'ghost'}
        className={cn('size-6', className)}
        {...props}
        onClick={handlePrevMonth}
      >
        <RiArrowLeftSLine />
      </Button>
    ),
    [handlePrevMonth]
  );

  const MemoizedNextButton = useCallback(
    ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
      <Button
        variant={'ghost'}
        className={cn('size-6', className)}
        {...props}
        onClick={handleNextMonth}
      >
        <RiArrowRightSLine />
      </Button>
    ),
    [handleNextMonth]
  );

  const memoizedComponents = useMemo(
    () => ({
      Weekday: MemoizedWeekday,
      DayButton: MemoizedDayButton,
      MonthCaption: MemoizedMonthCaption,
      NextMonthButton: MemoizedNextButton,
      PreviousMonthButton: MemoizedPrevButton,
    }),
    [
      MemoizedWeekday,
      MemoizedDayButton,
      MemoizedMonthCaption,
      MemoizedNextButton,
      MemoizedPrevButton,
    ]
  );

  useEffect(() => {
    const selected = props.selected;
    if (selected) {
      setMonth(
        dayjs(selected as Date)
          .startOf('month')
          .toDate()
      );
    } else {
      setMonth(dayjs().startOf('month').toDate());
    }
  }, [props.selected]);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('pointer-events-auto relative p-3', className)}
      classNames={{
        years_dropdown: 'flex',
        months: 'flex relative gap-2',
        month: 'flex flex-col gap-4 text-center',
        caption: 'flex justify-center pt-1 relative items-center w-full',
        caption_label: 'text-sm font-medium',
        nav: 'flex items-center gap-1 w-full absolute justify-between border-b pb-2',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-x-1',
        head_row: 'flex',
        head_cell:
          'text-neutral-500 rounded-md w-8 font-normal text-[0.8rem] dark:text-neutral-400 ',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-neutral-100 [&:has([aria-selected].day-range-end)]:rounded-r-md dark:[&:has([aria-selected])]:bg-neutral-800'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'table-cell size-8 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_start:
          'day-range-start aria-selected:bg-neutral-900 aria-selected:text-neutral-50 dark:aria-selected:bg-neutral-50 dark:aria-selected:text-neutral-900',
        day_range_end:
          'day-range-end aria-selected:bg-neutral-900 aria-selected:text-neutral-50 dark:aria-selected:bg-neutral-50 dark:aria-selected:text-neutral-900',
        day_selected:
          'bg-neutral-900 text-neutral-50 hover:bg-neutral-900 hover:text-neutral-50 focus:bg-neutral-900 focus:text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 dark:focus:bg-neutral-50 dark:focus:text-neutral-900',
        day_today:
          'bg-neutral-100 text-red-900 dark:bg-neutral-800 dark:text-neutral-50',
        day_outside:
          'day-outside text-neutral-500 aria-selected:text-neutral-500 dark:text-neutral-400 dark:aria-selected:text-neutral-400',
        day_disabled: 'text-neutral-500 opacity-50 dark:text-neutral-400',
        day_range_middle:
          'aria-selected:bg-neutral-100 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50',
        day_hidden: 'invisible',
        ...classNames,
      }}
      month={month}
      components={memoizedComponents}
      {...props}
    />
  );
}

export { Calendar };

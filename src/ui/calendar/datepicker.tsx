import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Button } from '../button';
import { cn } from '../../lib/utils.ts';
import { Calendar } from './calendar.tsx';
import { dayjs } from '../../lib/day.ts';

export function DatePicker() {
  const [date, setDate] = useState<Date | string | undefined>(new Date());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'tertiary'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? dayjs(date).format('DD-MM-YYYY') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(value) => setDate(value)}
        />
      </PopoverContent>
    </Popover>
  );
}

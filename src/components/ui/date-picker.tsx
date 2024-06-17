import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ selectedDate, onDateChange }, ref) => {
    const [date, setDate] = React.useState<Date | undefined>(selectedDate);

    React.useEffect(() => {
      setDate(selectedDate);
    }, [selectedDate]);

    const handleDateChange = (date: Date | undefined) => {
      setDate(date);
      onDateChange(date);
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DatePicker.displayName = 'DatePicker';

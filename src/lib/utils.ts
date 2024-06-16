import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isValid } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(value: any) {
  return value && isValid(new Date(value))
    ? format(value, 'yyyy-MM-dd')
    : value;
}

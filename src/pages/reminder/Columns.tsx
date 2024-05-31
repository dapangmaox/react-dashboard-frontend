import { ReminderModel } from '@/types/ReminderModel';
import { ColumnDef } from '@tanstack/react-table';
import { format, isValid } from 'date-fns';

function formatDate(value: any) {
  return isValid(new Date(value)) ? format(value, 'yyyy-MM-dd') : value;
}

export const columns: ColumnDef<ReminderModel>[] = [
  {
    header: '序号',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'title',
    header: '标题',
  },
  {
    accessorKey: 'description',
    header: '备注',
  },
  {
    accessorKey: 'date',
    header: '提醒日期',
    cell: ({ cell }) => formatDate(cell.getValue<Date>()),
  },
  {
    accessorKey: 'createdAt',
    header: '创建日期',
    cell: ({ cell }) => formatDate(cell.getValue<Date>()),
  },
];

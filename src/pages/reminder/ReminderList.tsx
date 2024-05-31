import { formatDate } from '@/lib/utils';
import { ReminderModel } from '@/types/ReminderModel';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../components/DataTable';

const columns: ColumnDef<ReminderModel>[] = [
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

interface ReminderListProps {
  reminderList: ReminderModel[];
}

const ReminderList: React.FC<ReminderListProps> = ({ reminderList }) => {
  return <DataTable columns={columns} data={reminderList ?? []} />;
};

export default ReminderList;

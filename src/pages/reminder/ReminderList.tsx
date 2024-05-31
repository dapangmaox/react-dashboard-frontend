import { formatDate } from '@/lib/utils';
import { ReminderModel } from '@/types/ReminderModel';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../components/DataTable';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ReminderListProps {
  reminderList: ReminderModel[];
  onEdit: (reminder: ReminderModel) => void;
  onDelete: (reminderId: number) => void;
}

const ReminderList: React.FC<ReminderListProps> = ({
  reminderList,
  onEdit,
  onDelete,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedReminderId, setSelectedReminderId] = useState<number | null>(
    null
  );

  const columns: ColumnDef<ReminderModel>[] = [
    {
      header: '序号',
      cell: ({ row }) => row.index + 1,
      size: 50,
    },
    {
      accessorKey: 'title',
      header: '标题',
    },
    {
      accessorKey: 'description',
      header: '备注',
      cell: ({ cell }) => (
        <div style={{ whiteSpace: 'pre-wrap' }}>{cell.getValue<string>()}</div>
      ),
    },
    {
      accessorKey: 'date',
      header: '提醒日期',
      cell: ({ cell }) => formatDate(cell.getValue<Date>()),
      size: 150,
    },
    {
      accessorKey: 'createdAt',
      header: '创建日期',
      cell: ({ cell }) => formatDate(cell.getValue<Date>()),
      size: 150,
    },
    {
      accessorKey: 'operation',
      header: '操作',
      cell: ({ row }) => (
        <div>
          <Button
            variant={'outline'}
            className="mr-2"
            onClick={() => onEdit(row.original)}
            size={'sm'}
          >
            编辑
          </Button>
          <Button
            variant={'outline'}
            onClick={() => handleDeleteClick(row.original.id!)}
            size={'sm'}
          >
            删除
          </Button>
        </div>
      ),
      size: 150,
    },
  ];

  const handleDeleteClick = (reminderId: number) => {
    setSelectedReminderId(reminderId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedReminderId !== null) {
      onDelete(selectedReminderId);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <DataTable columns={columns} data={reminderList ?? []} />
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
          </DialogHeader>
          <div>你确定要删除这个提醒吗？</div>
          <DialogFooter>
            <Button
              variant={'outline'}
              onClick={() => setDeleteDialogOpen(false)}
            >
              取消
            </Button>
            <Button onClick={handleDeleteConfirm}>删除</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReminderList;

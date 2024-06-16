import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatDate } from '@/lib/utils';
import { Todo, TodoPriority, TodoStatus } from '@/types/todo';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { DataTable } from '../../components/ui/data-table';
import { StatusMapping } from '@/constants';

interface TodoListProps {
  todoList: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (todoId: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todoList, onEdit, onDelete }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const columns: ColumnDef<Todo>[] = [
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
      accessorKey: 'dueDate',
      header: '截止日期',
      cell: ({ cell }) => formatDate(cell.getValue<Date>()),
      size: 150,
    },
    {
      accessorKey: 'priority',
      header: '优先级',
      cell: ({ cell }) => {
        const priority = cell.getValue<TodoPriority>();
        let priorityClassName = '';
        let priorityText = '';

        switch (priority) {
          case TodoPriority.High:
            priorityClassName = 'bg-red-400 text-white'; // Red background and white text for high priority
            priorityText = '高';
            break;
          case TodoPriority.Medium:
            priorityClassName = 'bg-yellow-400 text-black'; // Yellow background and black text for medium priority
            priorityText = '中';
            break;
          case TodoPriority.Low:
            priorityClassName = 'bg-green-400 text-white'; // Green background and white text for low priority
            priorityText = '低';
            break;
        }

        return (
          <div className={`px-2 py-1 rounded-md ${priorityClassName}`}>
            {priorityText}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: '状态',
      cell: ({ cell }) => StatusMapping[cell.getValue<TodoStatus>()],
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

  const handleDeleteClick = (todoId: number) => {
    setSelectedTodoId(todoId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedTodoId !== null) {
      onDelete(selectedTodoId);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <DataTable columns={columns} data={todoList ?? []} />
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

export default TodoList;

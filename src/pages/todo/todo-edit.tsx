import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Todo, TodoPriority, TodoStatus } from '@/types/todo';
import { Label } from '@radix-ui/react-label';
import { LoaderCircleIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axios-config';
import { ApiResponse } from '@/types';
import { StatusMapping } from '@/constants';

interface TodoEditProps {
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  editingTodo: Todo | null;
  setEditingTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}

const initialState: Todo = {
  title: '',
  description: '',
  dueDate: undefined,
  priority: TodoPriority.Medium,
  status: TodoStatus.NotStarted,
};

const TodoEdit: React.FC<TodoEditProps> = ({
  setTodoList,
  editingTodo,
  setEditingTodo,
}: TodoEditProps) => {
  const [formState, setFormState] = useState<Todo>(initialState);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setFormState(editingTodo);
      setDialogOpen(true);
    }
  }, [editingTodo]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      title: value,
    }));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      description: value,
    }));
  };

  const handleDueDateChange = (date: Date | undefined) => {
    setFormState((prevState) => ({
      ...prevState,
      dueDate: date || new Date(),
    }));
  };

  const handlePriorityChange = (priority: TodoPriority) => {
    setFormState((prevState) => ({
      ...prevState,
      priority,
    }));
  };

  const handleStatusChange = (status: TodoStatus) => {
    setFormState((prevState) => ({
      ...prevState,
      status,
    }));
  };

  const handleAddUpdateTodo = async () => {
    setLoading(true);
    try {
      const url = `/todo${editingTodo ? '/' + editingTodo.id : ''}`;
      const method = editingTodo ? 'patch' : 'post';

      const response = await axiosInstance<ApiResponse<Todo>>({
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: formState,
      });

      const { message, data: addedTodo } = response.data;

      if (message === 'success') {
        setTodoList((prevTodoList) =>
          editingTodo
            ? prevTodoList.map((todo) =>
                todo.id === addedTodo.id ? addedTodo : todo
              )
            : [addedTodo, ...prevTodoList]
        );
        setFormState(initialState);
        setDialogOpen(false);
        setEditingTodo(null);
      } else {
        console.error('Failed to add todo');
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to add todo: ', error);
    }
  };

  return (
    <div className="mb-4">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className="mr-2 w-4 h-4" />
            新建
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{editingTodo ? '编辑' : '新建'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 pr-4">
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                标题
              </Label>
              <Input
                id="title"
                value={formState.title}
                onChange={handleTitleChange}
                className="col-span-5"
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                截止日期
              </Label>
              <DatePicker
                selectedDate={formState.dueDate}
                onDateChange={handleDueDateChange}
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                优先级
              </Label>
              <Select
                value={formState.priority}
                onValueChange={handlePriorityChange}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                状态
              </Label>
              <Select
                value={formState.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TodoStatus.NotStarted}>
                    {StatusMapping[TodoStatus.NotStarted]}
                  </SelectItem>
                  <SelectItem value={TodoStatus.InProgress}>
                    {StatusMapping[TodoStatus.InProgress]}
                  </SelectItem>
                  <SelectItem value={TodoStatus.Completed}>
                    {StatusMapping[TodoStatus.Completed]}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                备注
              </Label>
              <Textarea
                id="description"
                value={formState.description}
                onChange={handleDescriptionChange}
                className="col-span-5"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant={'outline'}
              onClick={() => {
                setFormState(initialState);
                setDialogOpen(false);
                setEditingTodo(null);
              }}
            >
              取消
            </Button>
            <Button
              type="button"
              onClick={handleAddUpdateTodo}
              disabled={loading}
            >
              {loading && (
                <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodoEdit;

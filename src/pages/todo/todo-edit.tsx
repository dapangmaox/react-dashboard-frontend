import FormFieldWrapper from '@/components/FormFieldWrapper';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { StatusMapping } from '@/constants';
import { ApiResponse } from '@/types';
import { Todo, TodoPriority, TodoStatus } from '@/types/todo';
import axiosInstance from '@/utils/axios-config';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircleIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface TodoEditProps {
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  editingTodo: Todo | null;
  setEditingTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: '标题长度最少为2',
  }),
  description: z.string(),
  dueDate: z.date(),
  priority: z.nativeEnum(TodoPriority),
  status: z.nativeEnum(TodoStatus),
});

const TodoEdit: React.FC<TodoEditProps> = ({
  setTodoList,
  editingTodo,
  setEditingTodo,
}: TodoEditProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<Todo>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: undefined,
      priority: TodoPriority.Medium,
      status: TodoStatus.NotStarted,
    },
  });

  useEffect(() => {
    if (editingTodo) {
      form.reset(editingTodo);
      setDialogOpen(true);
    }
  }, [editingTodo, form]);

  const handleAddUpdateTodo = async (data: Todo) => {
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
        data,
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
        form.reset();
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
          <Form {...form}>
            <DialogHeader>
              <DialogTitle>{editingTodo ? '编辑' : '新建'}</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={form.handleSubmit(handleAddUpdateTodo)}
              className="space-y-8 mr-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormFieldWrapper label="标题">
                    <Input {...field} />
                  </FormFieldWrapper>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormFieldWrapper label="截止日期">
                    <DatePicker
                      {...field}
                      selectedDate={field.value}
                      onDateChange={field.onChange}
                    />
                  </FormFieldWrapper>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormFieldWrapper label="优先级">
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="请选择优先级" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormFieldWrapper>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormFieldWrapper label="状态">
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="请选择状态" />
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
                  </FormFieldWrapper>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormFieldWrapper label="备注">
                    <Textarea id="description" {...field} />
                  </FormFieldWrapper>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant={'outline'}
                  onClick={() => {
                    setDialogOpen(false);
                    setEditingTodo(null);
                    form.reset();
                  }}
                >
                  取消
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading && (
                    <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  保存
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodoEdit;

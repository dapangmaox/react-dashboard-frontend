import { useToast } from '@/components/ui/use-toast';
import { Todo } from '@/types/todo';
import axiosInstance from '@/utils/axios-config';
import { useEffect, useState } from 'react';
import TodoEdit from './todo-edit';
import TodoList from './todo-list';

const TodoPage = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const response = await axiosInstance.get('/todo');
        const list: Todo[] = response.data.data;
        setTodoList(list);
      } catch (error) {
        console.error('Failed to fetch todo list: ', error);
      }
    };

    fetchTodoList();
  }, []);

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleDelete = async (todoId: number) => {
    try {
      const response = await axiosInstance.delete(`/todo/${todoId}`);

      const { message } = response.data;

      if (message === 'success') {
        toast({
          description: 'Delete success.',
        });
        setTodoList((prevTodoList) =>
          prevTodoList.filter((todo) => todo.id !== todoId)
        );
      } else {
        console.error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Failed to delete todo: ', error);
    }
  };

  return (
    <div className="flex flex-col">
      <TodoEdit
        setTodoList={setTodoList}
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
      />
      <TodoList
        todoList={todoList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TodoPage;

import { TodoStatus } from '@/types/todo';

export const StatusMapping: { [key in TodoStatus]: string } = {
  [TodoStatus.NotStarted]: '未开始',
  [TodoStatus.InProgress]: '进行中',
  [TodoStatus.Completed]: '完成',
};

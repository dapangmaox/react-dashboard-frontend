export interface Todo {
  id?: number;
  title: string;
  description: string;
  dueDate?: Date;
  createdAt?: string;
  updatedAt?: string;
  priority?: TodoPriority;
  status?: TodoStatus;
}

export enum TodoPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export enum TodoStatus {
  NotStarted = 'not_started',
  InProgress = 'in_progress',
  Completed = 'completed',
}

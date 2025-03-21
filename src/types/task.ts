export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  priority: Priority;
  status: Status;
  createdAt: string;
}
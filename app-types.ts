export type T_TaskType = 'Bug' | 'Feature' | 'Documentation';
export type Priority = 'Low' | 'Medium' | 'High';
export type T_TaskStatus =
  | 'To Do'
  | 'In Progress'
  | 'Done'
  | 'Backlog'
  | 'Canceled';

export type T_Task = {
  createdAt: string; // ISO_date_string
  isFavorite: boolean;
  type: T_TaskType;
  priority: Priority;
  status: T_TaskStatus;
  taskId: string;
  title: string;
};

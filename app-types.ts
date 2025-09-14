export type T_TaskType = 'Bug' | 'Feature' | 'Documentation';

export type T_Priority = 'Low' | 'Medium' | 'High';

export enum E_TaskStatus {
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Done = 'Done',
  Backlog = 'Backlog',
  Canceled = 'Canceled',
}

export type T_Task = {
  createdAt: string; // ISO_date_string
  isFavorite: boolean;
  type: T_TaskType;
  priority: T_Priority;
  status: E_TaskStatus;
  taskId: number;
  title: string;
};

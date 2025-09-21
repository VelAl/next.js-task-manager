export enum E_TaskType {
  Bug = 'Bug',
  Feature = 'Feature',
  Documentation = 'Documentation',
}

export enum E_TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

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
  type: E_TaskType;
  priority: E_TaskPriority;
  status: E_TaskStatus;
  taskId: number;
  title: string;
};

export type T_ActionResultStatus = {
  toastType: 'success' | 'error';
  message: string;
};

export type Label = 'Bug' | 'Feature' | 'Documentation';
export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'To Do' | 'In Progress' | 'Done' | 'Backlog' | 'Cancelled';

export type T_Task = {
  createdAt: string; // ISO_date_string
  isFavorite: boolean;
  label: Label;
  priority: Priority;
  status: Status;
  taskId: string;
  title: string;
};

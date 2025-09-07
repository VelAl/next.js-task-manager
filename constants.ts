import { T_Priority, T_TaskStatus } from './app-types';

export const priorities: T_Priority[] = ['Low', 'Medium', 'High'] as const;

export const statuses: T_TaskStatus[] = [
  'To Do',
  'In Progress',
  'Done',
  'Backlog',
  'Canceled',
] as const;

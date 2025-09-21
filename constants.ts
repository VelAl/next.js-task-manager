import { E_TaskPriority, E_TaskStatus } from './app-types';

export const priorities: E_TaskPriority[] = [
  E_TaskPriority.Low,
  E_TaskPriority.Medium,
  E_TaskPriority.High,
] as const;

export const statuses: E_TaskStatus[] = Object.values(E_TaskStatus);

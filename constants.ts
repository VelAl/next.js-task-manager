import { E_TaskStatus, T_Priority } from './app-types';

export const priorities: T_Priority[] = ['Low', 'Medium', 'High'] as const;

export const statuses: E_TaskStatus[] = Object.values(E_TaskStatus);

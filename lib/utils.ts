import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import z from 'zod';

import { E_TaskPriority, E_TaskStatus, E_TaskType } from '@/app-types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateDigitID = () => {
  const min = 1e4;
  const max = 99999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const TaskSchema = z.object({
  createdAt: z.iso.datetime(),
  isFavorite: z.boolean(),
  type: z.enum(E_TaskType),
  priority: z.enum(E_TaskPriority),
  status: z.enum(E_TaskStatus),
  taskId: z.number().int().nonnegative(),
  title: z.string().min(3).max(90),
});

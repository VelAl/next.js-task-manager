import { IoMdArrowUp } from 'react-icons/io';
import { IoArrowBack, IoArrowDown } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';

import { E_TaskPriority } from '@/app-types';

export type E_PriorityOption = {
  value: E_TaskPriority;
  label: string;
  icon: IconType;
};

export const options: E_PriorityOption[] = [
  { value: E_TaskPriority.Low, label: 'Low', icon: IoArrowDown },
  { value: E_TaskPriority.Medium, label: 'Medium', icon: IoArrowBack },
  { value: E_TaskPriority.High, label: 'High', icon: IoMdArrowUp },
] as const;

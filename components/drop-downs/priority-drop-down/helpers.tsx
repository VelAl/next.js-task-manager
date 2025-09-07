import { IoMdArrowUp } from 'react-icons/io';
import { IoArrowBack, IoArrowDown } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';

import { T_Priority } from '@/app-types';

export type T_PriorityOption = {
  value: T_Priority;
  label: string;
  icon: IconType;
};

export const options: T_PriorityOption[] = [
  { value: 'Low', label: 'Low', icon: IoArrowDown },
  { value: 'Medium', label: 'Medium', icon: IoArrowBack },
  { value: 'High', label: 'High', icon: IoMdArrowUp },
] as const;

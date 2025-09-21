import { Copy, Edit2, type LucideIcon, Star, Trash } from 'lucide-react';

import { T_ActionResultStatus, T_Task } from '@/app-types';
import { useTasksDataStore } from '@/hooks/useTasksStore';

export const getTaskOptions = (
  task: T_Task
): {
  icon: LucideIcon;
  label: string;
  action: (task: T_Task) => T_ActionResultStatus | void;
  className?: string;
}[] =>
  [
    {
      icon: Edit2,
      label: 'Edit',
      action: (task: T_Task) =>
        useTasksDataStore.getState().setSelectedTask(task),
    },
    {
      icon: Copy,
      label: 'Make a Copy',
      action: useTasksDataStore.getState().copyTask,
    },
    {
      icon: Star,
      label: `${task.isFavorite ? 'Unmark' : 'Mark'} as Favorite`,
      action: useTasksDataStore.getState().setTaskIsFavorite,
    },
    {
      icon: Trash,
      label: 'Delete',
      action: useTasksDataStore.getState().deleteTask,
      className: 'text-red-500',
    },
  ] as const;

import { Copy, Edit2, Star, Trash } from 'lucide-react';

import { T_Task } from '@/app-types';
import { useTasksDataStore } from '@/hooks/useTasksStore';

export const getTaskOptions = (task: T_Task) =>
  [
    // {
    //   icon: Edit2,
    //   label: 'Edit',
    //   kind: 'edit',
    // },
    // {
    //   icon: Copy,
    //   label: 'Make a Copy',
    //   kind: 'copy',
    // },
    {
      icon: Star,
      label: `${task.isFavorite ? 'Unmark' : 'Mark'} as Favorite`,
      action: useTasksDataStore.getState().setTaskIsFavorite,
    },
    // {
    //   icon: Trash,
    //   label: 'Delete',
    //   kind: 'delete',
    // },
  ] as const;

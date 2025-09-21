import { useMemo } from 'react';

import { E_TaskPriority, E_TaskStatus, T_Task } from '@/app-types';

import { useTasksDataStore } from './useTasksStore';

export type T_TasksCounts = { [key in E_TaskPriority | E_TaskStatus]?: number } & {
  totalTasksCount: number;
  completedTasksCount: number;
  pendingTasksCount: number;
};

const getTasksCounts = (tasks: T_Task[], totals: T_TasksCounts) =>
  tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    acc[task.status] = (acc[task.status] || 0) + 1;

    if (task.status === 'Done') {
      totals.completedTasksCount += 1;
    } else if (task.status === 'In Progress' || task.status === 'To Do') {
      totals.pendingTasksCount += 1;
    }

    return acc;
  }, totals);

export const useTasksCounts = () => {
  const { tasks } = useTasksDataStore();

  return useMemo<T_TasksCounts>(() => {
    const emptyTotals = {
      totalTasksCount: tasks?.length || 0,
      completedTasksCount: 0,
      pendingTasksCount: 0,
    };

    return tasks ? getTasksCounts(tasks, emptyTotals) : emptyTotals;
  }, [tasks]);
};

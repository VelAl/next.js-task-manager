import { create } from 'zustand';

import { T_ActionResultStatus, T_Task } from '@/app-types';
import { tasks } from '@/data-mocked/tasks-data';
import {
  generateDigitID,
  T_TaskFormData,
  TaskFormSchema,
  TaskSchema,
} from '@/lib/utils';

export interface useTasksDataStoreInterface {
  //_STATE_____________________________________________________________________
  tasks: T_Task[] | null;
  selectedTask: T_Task | null;

  //_ACTIONS___________________________________________________________________
  setSelectedTask: (task: T_Task | null) => void;
  setTasks: (tasks: T_Task[]) => void;
  copyTask: (task: T_Task) => T_ActionResultStatus;
  setTaskIsFavorite: (task: T_Task) => T_ActionResultStatus;
  deleteTask: (task: T_Task) => T_ActionResultStatus;
  addTask: (task: T_TaskFormData) => T_ActionResultStatus;
  updateTask: (
    task: T_TaskFormData & Pick<T_Task, 'taskId'>
  ) => T_ActionResultStatus;
}

export const useTasksDataStore = create<useTasksDataStoreInterface>((set) => ({
  //_STATE____________________________________________________________________________
  tasks: tasks,
  selectedTask: null,

  //_ACTIONS__________________________________________________________________________
  setTasks: (tasks) => {
    set({ tasks });
  },

  setSelectedTask: (selectedTask) => {
    set({ selectedTask });
  },

  setTaskIsFavorite: ({ taskId, isFavorite }: T_Task) => {
    let type: T_ActionResultStatus['toastType'] = 'error';

    set((state) => {
      const updatedTasks = state.tasks?.map((task) => {
        if (task.taskId === taskId) {
          type = 'success';

          return { ...task, isFavorite: !isFavorite };
        } else {
          return task;
        }
      });

      return { tasks: updatedTasks || null };
    });

    return {
      toastType: type,
      message:
        type === 'error'
          ? `Task with ID ${taskId} not found!`
          : 'The task was updated successfully!',
    };
  },

  deleteTask: ({ taskId }: T_Task) => {
    let toastType: T_ActionResultStatus['toastType'] = 'error';
    set((state) => {
      if (!state.tasks) return {};

      const updatedTasks = state.tasks.filter((task) => task.taskId !== taskId);

      if (updatedTasks?.length === state.tasks.length) {
        return {};
      }
      toastType = 'success';
      return { tasks: updatedTasks || null };
    });

    return {
      toastType,
      message:
        toastType === 'error'
          ? `Task with ID ${taskId} not found!`
          : 'The Task was deleted successfully!',
    };
  },

  copyTask: (task: T_Task) => {
    const validatedTask = TaskSchema.safeParse(task);

    if (!validatedTask.success) {
      return {
        toastType: 'error',
        message: `Invalid task data! ${validatedTask.error.message}`,
      };
    }

    const newTask = {
      ...task,
      taskId: generateDigitID(),
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      tasks: state.tasks ? [...state.tasks, newTask] : [newTask],
    }));

    return {
      toastType: 'success',
      message: `Task copied successfully! New Task ID: ${newTask.taskId}`,
    };
  },

  addTask: (task) => {
    const validatedTask = TaskFormSchema.safeParse(task);

    if (!validatedTask.success) {
      return {
        toastType: 'error',
        message: `Invalid task data! ${validatedTask.error.message}`,
      } as T_ActionResultStatus;
    }

    const newTask = {
      ...task,
      taskId: generateDigitID(),
      createdAt: new Date().toISOString(),
      isFavorite: false, // default value for new tasks
    };

    set((state) => ({
      tasks: state.tasks ? [...state.tasks, newTask] : [newTask],
    }));

    return {
      toastType: 'success',
      message: `Task added successfully! New Task ID: ${newTask.taskId}`,
    } as T_ActionResultStatus;
  },

  updateTask: (task) => {
    const validatedTask = TaskFormSchema.safeParse(task);

    if (!validatedTask.success) {
      return {
        toastType: 'error',
        message: `Invalid task data! ${validatedTask.error.message}`,
      } as T_ActionResultStatus;
    }

    let toastType: T_ActionResultStatus['toastType'] = 'error';

    set((state) => {
      if (!state.tasks) return {};

      const updatedTasks = structuredClone(state.tasks);

      const ind = state.tasks.findIndex((t) => t.taskId === task.taskId);

      if (ind === -1) {
        return {};
      } else {
        updatedTasks[ind] = {
          ...updatedTasks[ind],
          ...task,
        };

        toastType = 'success';
      }

      return { tasks: updatedTasks };
    });

    return {
      toastType,
      message:
        toastType === 'error'
          ? `Task with ID ${task.taskId} not found!`
          : `The Task ID: ${task.taskId} was updated successfully!`,
    };
  },
}));

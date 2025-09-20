import { ToastT } from 'sonner';
import { create } from 'zustand';

import { T_ActionResultStatus, T_Task } from '@/app-types';
import { tasks } from '@/data-mocked/tasks-data';

export interface useTasksDataStoreInterface {
  tasks: T_Task[] | null;
  selectedTask: T_Task | null;

  setSelectedTask: (task: T_Task | null) => void;
  setTasks: (tasks: T_Task[]) => void;
  setTaskIsFavorite: (task: T_Task) => T_ActionResultStatus;
  updateTasks: (
    tasks: T_Task[],
    operation?: string | undefined
  ) => Promise<{ success: boolean; message: string }>;
  addTask: (task: T_Task) => Promise<{ success: boolean; message: string }>;
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

  updateTasks: async (
    updatedTasksArray: T_Task[],
    operation: string | undefined
  ) => {
    // Variable to store a success message based on the operation type
    let successMessage = '';

    // Determine the success message based on the operation type
    switch (operation) {
      case 'copy':
        successMessage = 'Task has been copied successfully!';
        break;
      case 'delete':
        successMessage = 'Task has been deleted successfully!';
        break;
      default:
        successMessage = 'Operation completed successfully!';
        break;
    }

    try {
      // Simulate an asynchronous operation (e.g., API call) with a delay
      const result = await new Promise<{ success: boolean; message: string }>(
        (resolve) => {
          setTimeout(() => {
            // Update the state with the new tasks array
            set({ tasks: updatedTasksArray });

            // Resolve the Promise with a success status and message
            resolve({
              success: true,
              message: successMessage,
            });
          }, 1233); // Simulate a delay of 1233 milliseconds
        }
      );

      // Return the result of the resolved Promise
      return result;
    } catch (error: unknown) {
      console.log(error);

      // If an error occurs, return a failure status and a generic error message
      return { success: false, message: 'Something went wrong!' };
    }
  },

  // New function: addTask
  addTask: async (task: T_Task) => {
    try {
      // Simulate an asynchronous operation (e.g., API call) with a delay
      const result = await new Promise<{ success: boolean; message: string }>(
        (resolve) => {
          setTimeout(() => {
            // Update the state by adding the new task to the tasks array
            set((state) => {
              const updatedTasks = state.tasks
                ? [...state.tasks, task]
                : [task];
              return { tasks: updatedTasks };
            });

            // Resolve the Promise with a success status and message
            resolve({
              success: true,
              message: 'Task added successfully!',
            });
          }, 1000); // Simulate a delay of 1000 milliseconds
        }
      );

      return result;
    } catch (error) {
      console.log(error);

      // If an error occurs, return a failure status and a generic error message
      return { success: false, message: 'Failed to add task!' };
    }
  },
}));

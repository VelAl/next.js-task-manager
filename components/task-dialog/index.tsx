'use client';

import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { E_TaskPriority, E_TaskStatus, E_TaskType } from '@/app-types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useTasksDataStore } from '@/hooks/useTasksStore';
import { T_TaskFormData, TaskFormSchema } from '@/lib/utils';

import { TaskType } from './sub-components/task-labels';
import { TaskPriority } from './sub-components/task-priority';
import { TaskStatus } from './sub-components/task-status';
import TaskTitle from './sub-components/task-title';

const defaultValues: T_TaskFormData = {
  title: '',
  status: E_TaskStatus.ToDo,
  priority: E_TaskPriority.Medium,
  type: E_TaskType.Feature,
};

export const TaskDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { addTask, selectedTask, setSelectedTask, updateTask } =
    useTasksDataStore();

  const form = useForm<T_TaskFormData>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues,
  });

  const { handleSubmit, reset, setValue } = form;

  const _onSubmit = (data: T_TaskFormData) => {
    const res = selectedTask
      ? updateTask({ ...data, taskId: selectedTask.taskId })
      : addTask(data);

    toast[res.toastType](res.message, {
      duration: 3000,
    });

    if (res.toastType === 'success') {
      setSelectedTask(null);
      reset(defaultValues);
      setIsOpen(false);
    }
  };

  const _onOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      reset(defaultValues);

      setSelectedTask(null);
    }
  };

  useEffect(() => {
    if (selectedTask) {
      reset({
        title: selectedTask.title,
        status: selectedTask.status,
        priority: selectedTask.priority,
        type: selectedTask.type,
      });

      setIsOpen(true);
    }
  }, [selectedTask, reset, setValue, isOpen]);

  return (
    <Dialog onOpenChange={_onOpenChange} open={isOpen}>
      <DialogTrigger asChild>
        <Button>Add New Task</Button>
      </DialogTrigger>

      <DialogContent className='poppins max-w-4xl'>
        <DialogHeader>
          <DialogTitle className='text-xl'>
            {selectedTask ? `Edit Task` : 'Add New Task'}
          </DialogTitle>
          <DialogDescription>
            {selectedTask
              ? `Edit the form to update the task ID: ${selectedTask.taskId}`
              : `Fill in the form to add a task`}
          </DialogDescription>
          <div className='mt-4'>
            <Separator className='mt-3' />
          </div>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={handleSubmit(_onSubmit)}>
            <div className='my-8'>
              <div className='grid grid-cols-2 gap-5'>
                <TaskTitle />
                <TaskStatus />
              </div>

              <div className='grid grid-cols-2 gap-5 mt-6'>
                <TaskPriority />
                <TaskType />
              </div>
            </div>

            <DialogFooter className='mb-4'>
              <DialogClose asChild>
                <Button className='px-9' type='button' variant='secondary'>
                  Close
                </Button>
              </DialogClose>
              <Button type='submit'>
                {selectedTask ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

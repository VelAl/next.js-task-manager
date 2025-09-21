'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

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

export const TaskDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addTask } = useTasksDataStore();

  const form = useForm<T_TaskFormData>({
    resolver: zodResolver(TaskFormSchema),
  });

  const { handleSubmit, reset, setValue } = form;

  // const { isOpen, setIsOpen } = useOpenDialogStore();

  const onSubmit = (data: T_TaskFormData) => {
    const res = addTask(data);

    toast[res.toastType](res.message, {
      duration: 3000,
    });

    if (res.toastType === 'success') {
      reset();
      setIsOpen(false);
    }
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>Add New Task</Button>
      </DialogTrigger>

      <DialogContent className='poppins max-w-4xl'>
        <DialogHeader>
          <DialogTitle className='text-xl'>{'Add Task'}</DialogTitle>
          <DialogDescription>Fill in the form to add a task</DialogDescription>
          <div className='mt-4'>
            <Separator className='mt-3' />
          </div>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <Button type='submit'>Add New Task</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

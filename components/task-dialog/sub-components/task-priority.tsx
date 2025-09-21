import { Controller, useFormContext } from 'react-hook-form';
import { IoMdArrowUp } from 'react-icons/io';
import { IoArrowBack, IoArrowDown } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';

import { Label } from '@radix-ui/react-dropdown-menu';

import { E_TaskPriority } from '@/app-types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { T_TaskFormData } from '@/lib/utils';

type Priority = {
  value: E_TaskPriority;
  icon: IconType;
};

const priorityOptions: Priority[] = [
  { value: E_TaskPriority.Low, icon: IoArrowDown },
  { value: E_TaskPriority.Medium, icon: IoArrowBack },
  { value: E_TaskPriority.High, icon: IoMdArrowUp },
];

export const TaskPriority = () => {
  const { control } = useFormContext<T_TaskFormData>();
  return (
    <div className='flex flex-col gap-2'>
      <Label className='opacity-75 text-sm font-medium'>Task Priority</Label>
      <Controller
        control={control}
        defaultValue={E_TaskPriority.Low}
        name='priority'
        render={({ field }) => {
          return (
            <Select
              onValueChange={(value: T_TaskFormData['priority']) => {
                field.onChange(value);
              }}
              value={field.value}
            >
              <SelectTrigger className='w-full h-11'>
                <SelectValue placeholder='Select a status...' />
              </SelectTrigger>
              <SelectContent className='poppins'>
                <SelectGroup>
                  {priorityOptions.map((status, index) => (
                    <SelectItem key={index} value={status.value}>
                      <div className='flex items-center gap-2'>
                        <status.icon size={15} />
                        <span>{status.value}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          );
        }}
      />
    </div>
  );
};

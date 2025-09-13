// import { Controller, useFormContext } from 'react-hook-form';
import { IoMdArrowUp } from 'react-icons/io';
import { IoArrowBack, IoArrowDown } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';

import { Label } from '@radix-ui/react-dropdown-menu';

import { T_Task } from '@/app-types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// import { T_TaskFormData } from '../task-dialog-schema';

type Priority = {
  value: T_Task['priority'];
  icon: IconType;
};

const priorityOptions: Priority[] = [
  { value: 'Low', icon: IoArrowDown },
  { value: 'Medium', icon: IoArrowBack },
  { value: 'High', icon: IoMdArrowUp },
];

export const TaskPriority = () => {
  // const { control } = useFormContext<T_TaskFormData>();
  return (
    <div className='flex flex-col gap-2'>
      <Label className='opacity-75 text-sm font-medium'>Task Priority</Label>
      {/* <Controller
        name='priority'
        control={control}
        defaultValue='Low'
        render={({ field }) => {
          return ( */}
      <Select
      // value={field.value}
      // onValueChange={(value: T_TaskFormData['priority']) => {
      //   field.onChange(value);
      // }}
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
      {/* );
        }}
      /> */}
    </div>
  );
};

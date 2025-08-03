import { Controller, useFormContext } from 'react-hook-form';

import { Label } from '@radix-ui/react-dropdown-menu';
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from 'lucide-react';

import { T_Task } from '@/app-types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { TaskFormData } from '../task-dialog-schema';

type Status = {
  value: T_Task['status'];
  icon: LucideIcon;
};

const statuses: Status[] = [
  { value: 'Backlog', icon: HelpCircle },
  { value: 'To Do', icon: Circle },
  { value: 'In Progress', icon: ArrowUpCircle },
  { value: 'Done', icon: CheckCircle2 },
  { value: 'Canceled', icon: XCircle },
] as const;

export const TaskStatus = () => {
  const { control } = useFormContext<TaskFormData>();
  return (
    <div className='flex flex-col gap-2'>
      <Label className='opacity-75 text-sm font-medium'>Task Status</Label>
      <Controller
        name='status'
        control={control}
        defaultValue='Backlog'
        render={({ field }) => {
          return (
            <Select
              value={field.value}
              onValueChange={(value: TaskFormData['status']) => {
                field.onChange(value);
              }}
            >
              <SelectTrigger className='w-full h-11'>
                <SelectValue placeholder='Select a status...' />
              </SelectTrigger>
              <SelectContent className='poppins'>
                <SelectGroup>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
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

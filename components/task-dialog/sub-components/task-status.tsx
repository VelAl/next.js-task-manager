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

import { E_TaskStatus } from '@/app-types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { T_TaskFormData } from '@/lib/utils';

type T_StatusOption = {
  value: E_TaskStatus;
  icon: LucideIcon;
};

const statusesOptions: T_StatusOption[] = [
  { value: E_TaskStatus.Backlog, icon: HelpCircle },
  { value: E_TaskStatus.ToDo, icon: Circle },
  { value: E_TaskStatus.InProgress, icon: ArrowUpCircle },
  { value: E_TaskStatus.Done, icon: CheckCircle2 },
  { value: E_TaskStatus.Canceled, icon: XCircle },
] as const;

export const TaskStatus = () => {
  const { control } = useFormContext<T_TaskFormData>();
  return (
    <div className='flex flex-col gap-2'>
      <Label className='opacity-75 text-sm font-medium'>Task Status</Label>
      <Controller
        control={control}
        defaultValue={E_TaskStatus.Backlog}
        name='status'
        render={({ field }) => {
          return (
            <Select
              onValueChange={(value: T_TaskFormData['status']) => {
                field.onChange(value);
              }}
              value={field.value}
            >
              <SelectTrigger className='w-full h-11'>
                <SelectValue placeholder='Select a status...' />
              </SelectTrigger>
              <SelectContent className='poppins'>
                <SelectGroup>
                  {statusesOptions.map((status) => (
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

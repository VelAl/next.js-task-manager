import { Controller, useFormContext } from 'react-hook-form';

import { Label } from '@radix-ui/react-dropdown-menu';

import { E_TaskType } from '@/app-types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { T_TaskFormData } from '@/lib/utils';

export const TASK_TYPE_LABELS: E_TaskType[] = [
  E_TaskType.Bug,
  E_TaskType.Feature,
  E_TaskType.Documentation,
] as const;

export const TaskType = () => {
  const { control } = useFormContext<T_TaskFormData>();

  return (
    <div className='flex flex-col gap-2'>
      <Label className='opacity-75 text-sm font-medium'>Task Type</Label>
      <Controller
        control={control}
        defaultValue={E_TaskType.Feature}
        name='type'
        render={({ field }) => {
          return (
            <Select
              onValueChange={(value: T_TaskFormData['type']) => {
                field.onChange(value);
              }}
              value={field.value}
            >
              <SelectTrigger className='w-full h-11'>
                <SelectValue placeholder='Select a status...' />
              </SelectTrigger>
              <SelectContent className='poppins'>
                <SelectGroup>
                  {TASK_TYPE_LABELS.map((type) => (
                    <SelectItem key={type} value={type}>
                      <div className='flex items-center gap-2'>
                        <span>{type}</span>
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

// import { Controller, useFormContext } from 'react-hook-form';

import { Label } from '@radix-ui/react-dropdown-menu';

import { TASK_TYPE_LABELS } from '@/components/drop-downs/tasks-drop-down/constants';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// import { T_TaskFormData } from '../task-dialog-schema';

export const TaskType = () => {
  // const { control } = useFormContext<T_TaskFormData>();
  return (
    <div className='flex flex-col gap-2'>
      <Label className='opacity-75 text-sm font-medium'>Task Type</Label>
      {/* <Controller
        name='type'
        defaultValue='Bug'
        control={control}
        render={({ field }) => {
          return ( */}
            <Select
              // value={field.value}
              // onValueChange={(value: T_TaskFormData['type']) => {
              //   field.onChange(value);
              // }}
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
          {/* );
        }}
      /> */}
    </div>
  );
};

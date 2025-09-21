import { useFormContext } from 'react-hook-form';

import { Label } from '@radix-ui/react-dropdown-menu';

import { Input } from '@/components/ui/input';

import { T_TaskFormData } from '../task-dialog-schema';

export default function TaskTitle() {
  const {
    register,
    formState: { errors },
  } = useFormContext<T_TaskFormData>();
  return (
    <div className='flex flex-col gap-2'>
      <Label className='opacity-75 text-sm font-medium'>Task Title</Label>

      <Input className='h-9' placeholder='Study...' {...register('title')} />

      {errors.title && (
        <p className='text-red-500 text-sm'>{errors.title.message}</p>
      )}
    </div>
  );
}

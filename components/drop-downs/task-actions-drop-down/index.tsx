import { BsThreeDots } from 'react-icons/bs';

import { toast } from 'sonner';

import { T_ActionResultStatus, T_Task } from '@/app-types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { getTaskOptions } from './helpers';

type T_Props = {
  task: T_Task;
};

export const TaskActionsDropDown: React.FC<T_Props> = ({ task }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost'>
          <BsThreeDots />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56 poppins'>
        {getTaskOptions(task).map((item) => (
          <DropdownMenuItem
            className='cursor-pointer'
            key={item.label}
            onClick={() => {
              const res: T_ActionResultStatus | undefined = item.action?.(task);

              if (res) {
                toast[res.toastType](res.message, {
                  duration: 3000,
                });
              }
            }}
          >
            <item.icon className={`mr-2 h-4 w-4`} />

            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

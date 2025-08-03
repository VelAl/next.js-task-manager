import { LucideIcon } from 'lucide-react';
import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
// import { handleMenuItemClick } from './utils';
// import { useTasksDataStore } from '@/app/hooks/useTasksDataStore';
// import { useToast } from '@/hooks/use-toast';
// import { T_Kind } from './types';
// import { useOpenDialogStore } from '@/app/hooks/useOpenDialogStore';

type T_Props = {
  Icon: LucideIcon;
  //   kind: T_Kind;
  label: string;
  shortcut: string; // Keyboard shortcut
  className?: string;
};

export function MenuItem({
  Icon,
  //   kind,
  label,
  shortcut,
  className,
}: T_Props) {
  //   const { tasks, selectedTask, updateTasks } = useTasksDataStore();
  //   const { toast } = useToast();
  //   const { setIsOpen } = useOpenDialogStore();

  return (
    <DropdownMenuItem
    //   onClick={() =>
    //     handleMenuItemClick(
    //       kind,
    //       tasks,
    //       selectedTask,
    //       updateTasks,
    //       toast,
    //       setIsOpen
    //     )
    //   }
    >
      <Icon className={`mr-2 h-4 w-4 ${className}`} />

      <span className={`${className}`}>{label}</span>

      {shortcut && (
        <DropdownMenuShortcut className={`${className}`}>
          {shortcut}
        </DropdownMenuShortcut>
      )}
    </DropdownMenuItem>
  );
}

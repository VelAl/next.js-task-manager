'use client';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';

import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { MENU_ITEMS } from './constants';
// import { MENU_ITEMS } from './constants';
import { MenuItem } from './menu-items';
import { LabelSubMenu } from './sub-label-menu';
// import { T_MenuItemType } from './types';
// import { useTasksDataStore } from '@/app/hooks/useTasksDataStore';
// import { T_TaskType, T_Task } from '@/app-types';
// import { toast } from '@/hooks/use-toast';

type T_Props = { onOpen: () => void; onClose: () => void };

export const TaskDropDown: React.FC<T_Props> = ({ onOpen, onClose }) => {
  const [selectedLabel, setSelectedLabel] = useState('Bug');

  //   const { selectedTask, updateTasks } = useTasksDataStore();
  //   const { tasks } = useTasksDataStore();

  //   const [menuItemsArray, setMenuItemsArray] =
  //     useState<T_MenuItemType[]>(MENU_ITEMS);

  //   // Update menu items based on selectedTask's isFavorite property
  //   useEffect(() => {
  //     setMenuItemsArray((prev) =>
  //       prev.map((item) => {
  //         if (item.kind === 'favorite') {
  //           return {
  //             ...item,
  //             label: selectedTask?.isFavorite ? 'Unfavorite' : 'Favorite',
  //           };
  //         }
  //         return item;
  //       })
  //     );
  //   }, [selectedTask]);

  //   //update the selected label based on the label property in the selected task
  //   useEffect(() => {
  //     if (selectedTask) {
  //       setSelectedLabel(selectedTask.label);
  //     }
  //   }, [selectedTask]);

  //   // Function to handle label clicks
  //   const clickedLabelItem = async (newLabel: string) => {
  //     // Validate the new label
  //     const validLabels: T_TaskType[] = ['Bug', 'Documentation', 'Feature'];
  //     if (!validLabels.includes(newLabel as T_TaskType)) {
  //       console.error(`The type ${newLabel} is incorrect`);
  //       return;
  //     }

  //     // Update the task's label in the data store
  //     if (selectedTask && tasks) {
  //       const updatedTask: T_Task = {
  //         ...selectedTask,
  //         type: newLabel as T_TaskType,
  //       };

  //       // Create a new tasks array with the updated task
  //       const updateTasksArray = tasks.map((task) =>
  //         task.taskId === selectedTask.taskId ? updatedTask : task
  //       );

  //       try {
  //         // Save the updated tasks array to the data store
  //         const result = await updateTasks(updateTasksArray);

  //         console.log('result ===>', result);

  //         // toast({
  //         //   variant: result.success ? 'default' : 'destructive',
  //         //   title: result.success
  //         //     ? `[${selectedTask.taskId}] Updated Successfully!`
  //         //     : `[${selectedTask.taskId}] Updated Failed!`,
  //         //   description: result.message,
  //         // });
  //       } catch (error) {
  //         console.error('Failed to update tasks:', error);
  //       }
  //     }
  //   };

  return (
    <DropdownMenu
      onOpenChange={(open: boolean) => (open ? onOpen() : onClose())}
    >
      <DropdownMenuTrigger asChild>
        <Button variant='ghost'>
          <BsThreeDots /> {/* Three dots icon */}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56 poppins'>
        <DropdownMenuGroup>
          {MENU_ITEMS.map((item) => (
            <MenuItem
              Icon={item.icon}
              key={item.label}
              // kind={item.kind}
              label={item.label}
              shortcut={item.shortcut}
            />
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <LabelSubMenu
            // onClickedLabelItem={clickedLabelItem}
            onValueChange={setSelectedLabel}
            value={selectedLabel}
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <MenuItem
          Icon={Trash}
          className='text-red-500'
          label='Delete'
          //   kind='delete'
          shortcut='⇧⌘Q'
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

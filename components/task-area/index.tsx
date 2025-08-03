import { IoCloseSharp } from 'react-icons/io5';

import { tasks } from '@/data-mocked/tasks-data';

import {
  PriorityDropDown,
  StatusDropDown,
  ViewColumnsDropdown,
} from '../drop-downs';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

import { tasksColumns } from './columns';
import { PaginationArea } from './pagination';
import { SearchInput } from './search-input';
import { TasksTable } from './tasks-table';

export const TasksArea = () => {
  return (
    <div className='px-4 mt-2'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <SearchInput />

              <StatusDropDown />
              <PriorityDropDown />

              <Button variant={'ghost'} className='h-10'>
                <span>Reset</span>
                <IoCloseSharp />
              </Button>
            </div>

            <ViewColumnsDropdown />
          </div>
        </CardHeader>

        <CardContent>
          <TasksTable columns={tasksColumns} data={tasks} />
        </CardContent>

        <CardFooter>
          <PaginationArea />
        </CardFooter>
      </Card>
    </div>
  );
};

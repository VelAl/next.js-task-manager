import { tasks } from '@/data-mocked/tasks-data';

import {
  PriorityDropDown,
  StatusDropDown,
  ViewColumnsDropdown,
} from '../drop-downs';
import { ResetFiltersBtn } from '../reset-filters-btn';
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

              <ResetFiltersBtn />
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

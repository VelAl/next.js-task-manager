import { IoCloseSharp } from 'react-icons/io5';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { SearchInput } from './search-input';

export const TasksArea = () => {
  return (
    <div className='px-4 mt-2'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <SearchInput />
              {/* STATUS DROPDOWN */}
              {/* PRIORITY DROPDOWN */}

              {/* <div className='grow' /> */}

              <Button variant={'ghost'} className='h-10'>
                <span>Reset</span>
                <IoCloseSharp />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>{/* TABLE */}</CardContent>

        <CardFooter> {/* PAGINATION */}</CardFooter>
      </Card>
    </div>
  );
};

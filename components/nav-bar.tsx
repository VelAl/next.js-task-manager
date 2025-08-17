// 'use client';

import { ListTodo } from 'lucide-react';

import { TaskDialog } from './task-dialog';
// import { useTheme } from 'next-themes';
import { ThemeModeToggle } from './theme-mode-toggle';

const AppNameLogo = () => {
  return (
    <div className='flex items-center gap-2 left-10 top-8'>
      <div className='size-9 bg-primary rounded-md flex items-center justify-center'>
        <ListTodo aria-hidden='true' className='text-white text-xl' />
      </div>

      <h1 className='font-semibold text-2xl font-poppins text-primary max-md:hidden'>
        Task <span className='font-normal text-primary'>Board</span>
      </h1>
    </div>
  );
};

export const NavBar = () => {
  return (
    <header
      className={`poppins relative w-full h-[92px] overflow-hidden flex justify-between 
                  items-center px-6 border-b bg-muted-foreground`}
    >
      <AppNameLogo />

      <div className='flex items-center gap-3 justify-center'>
        <TaskDialog />
        
        <ThemeModeToggle />
      </div>
    </header>
  );
};

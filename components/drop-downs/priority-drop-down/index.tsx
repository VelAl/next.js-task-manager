'use client';
import { useState } from 'react';
import { GoPlusCircle } from 'react-icons/go';

import { Table } from '@tanstack/react-table';
import { toast } from 'sonner';

import { E_TaskPriority } from '@/app-types';
import { priorities } from '@/constants';
import { useTasksCounts } from '@/hooks';

import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Separator } from '../../ui/separator';

import { options } from './helpers';

export const PriorityDropDown = <T,>({ table }: { table: Table<T> }) => {
  const counts = useTasksCounts();
  const [isOpen, setIsOpen] = useState(false);
  const { setColumnFilters, getState } = table;

  const selectedPriorities =
    (getState().columnFilters.find((f) => f.id === 'priority')
      ?.value as E_TaskPriority[]) || [];

  const updateSelection = (label: string) => {
    const priority = label as E_TaskPriority;
    if (!priorities.includes(priority)) {
      toast.error('Invalid priority selected');
      return;
    }

    const newPriorities = selectedPriorities.includes(priority)
      ? selectedPriorities.filter((p) => p !== priority)
      : [...selectedPriorities, priority];

    setColumnFilters((prev) => {
      const otherFilters = prev.filter((f) => f.id !== 'priority');
      if (newPriorities.length) {
        return [...otherFilters, { id: 'priority', value: newPriorities }];
      }
      return otherFilters;
    });
  };

  return (
    <div className='flex items-center space-x-4'>
      <Popover onOpenChange={setIsOpen} open={isOpen}>
        <PopoverTrigger asChild>
          <Button
            className='h-10 justify-start border-dashed px-5'
            size={'sm'}
            variant={'outline'}
          >
            <div className='flex gap-4 h-6'>
              <div className='flex items-center gap-2'>
                <GoPlusCircle />
                <span>Priority</span>
              </div>

              <Separator
                className='h-full bg-gray-200'
                orientation='vertical'
              />

              <div className='flex items-center gap-2'>
                {!selectedPriorities.length ? (
                  <span className='text-gray-500'>Select priority</span>
                ) : selectedPriorities.length <= 2 ? (
                  selectedPriorities.map((priority) => (
                    <Badge key={priority} variant='secondary'>
                      {priority}
                    </Badge>
                  ))
                ) : (
                  <span className='text-gray-500'>
                    Selected {selectedPriorities.length} priorities
                  </span>
                )}
              </div>
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align='center'
          className='p-0 poppins w-52'
          side='bottom'
        >
          <Command>
            <CommandInput placeholder='Change priority...' />

            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup heading='Suggestions'>
                {options.map((option) => (
                  <CommandItem
                    className='flex justify-between'
                    key={option.value}
                    onSelect={updateSelection}
                    value={option.value}
                  >
                    <div className='flex items-center gap-3'>
                      <Checkbox
                        checked={selectedPriorities.includes(option.value)}
                      />

                      <option.icon />

                      <span>{option.label}</span>
                    </div>

                    <pre>{counts[option.value] || 0}</pre>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

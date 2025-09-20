'use client';
import { useState } from 'react';
import { GoPlusCircle } from 'react-icons/go';

import { Table } from '@tanstack/react-table';
import { toast } from 'sonner';

import { E_TaskStatus } from '@/app-types';
import { statuses } from '@/constants';
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

export const StatusDropDown = <T,>({ table }: { table: Table<T> }) => {
  const counts = useTasksCounts();
  const [isOpen, setIsOpen] = useState(false);
  const { setColumnFilters, getState } = table;

  const selectedStatuses =
    (getState().columnFilters.find((f) => f.id === 'status')
      ?.value as E_TaskStatus[]) || [];

  const updateSelection = (label: string) => {
    const status = label as E_TaskStatus;

    if (!statuses.includes(status)) {
      toast.error('Invalid status selected');
      return;
    }

    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];

    setColumnFilters((prev) => {
      const otherFilters = prev.filter((f) => f.id !== 'status');
      if (newStatuses.length) {
        return [...otherFilters, { id: 'status', value: newStatuses }];
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
                <span>Status</span>
              </div>

              <Separator
                className='h-full bg-gray-200'
                orientation='vertical'
              />

              <div className='flex items-center gap-2'>
                {!selectedStatuses.length ? (
                  <span className='text-gray-500'>Select status</span>
                ) : selectedStatuses.length <= 2 ? (
                  selectedStatuses.map((status) => (
                    <Badge key={status} variant='secondary'>
                      {status}
                    </Badge>
                  ))
                ) : (
                  <span className='text-gray-500'>
                    Selected {selectedStatuses.length} priorities
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
                        checked={selectedStatuses.includes(option.value)}
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

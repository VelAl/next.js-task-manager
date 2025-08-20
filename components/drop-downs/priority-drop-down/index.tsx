'use client';
import { useMemo, useState } from 'react';
import { GoPlusCircle } from 'react-icons/go';

import { toast } from 'sonner';

import { T_Priority } from '@/app-types';
import { priorities } from '@/constants';
import { tasks } from '@/data-mocked/tasks-data';
import { usePrioritiesStore } from '@/hooks';

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

import { getOptionsWithCounts, T_PriorityOption } from './helpers';

export const PriorityDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { selectedPriorities, setSelectedPriorities } = usePrioritiesStore();

  const updateSelection = (label: string) => {
    const priority = label as T_Priority;

    if (!priorities.includes(priority)) {
      toast.error('Invalid priority selected');
      return;
    }

    const newPriorities = selectedPriorities.includes(priority)
      ? selectedPriorities.filter((p) => p !== priority)
      : [...selectedPriorities, priority];

    setSelectedPriorities(newPriorities);
  };

  const optionsWithCounts: T_PriorityOption[] = useMemo(
    () => getOptionsWithCounts(tasks),
    [tasks]
  );

  return (
    <div className='flex items-center space-x-4'>
      <Popover onOpenChange={setIsOpen} open={isOpen}>
        <PopoverTrigger asChild>
          <Button
            className='h-10 justify-start border-dashed px-5'
            size={'sm'}
            variant={'outline'}
          >
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <GoPlusCircle />
                <span>Priority</span>
              </div>

              <Separator
                className='h-6 border-1 border-gray-300'
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
                {optionsWithCounts.map((option) => (
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

                    <pre>{option.count}</pre>
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

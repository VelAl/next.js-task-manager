'use client';
import { useState } from 'react';
import { GoPlusCircle } from 'react-icons/go';
import { IoMdArrowUp } from 'react-icons/io';
import { IoArrowBack, IoArrowDown } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';

type Status = {
  value: string;
  label: string;
  icon: IconType;
};

const statuses: Status[] = [
  { value: 'low', label: 'Low', icon: IoArrowDown },
  { value: 'medium', label: 'Medium', icon: IoArrowBack },
  { value: 'high', label: 'High', icon: IoMdArrowUp },
];

export const PriorityDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<Status | null>(null);

  // console.log('selectedPriority ===>', selectedPriority);

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
                <Badge variant={'secondary'}>Low</Badge>
                <Badge variant={'secondary'}>Medium</Badge>
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
                {statuses.map((status) => (
                  <CommandItem
                    className='flex justify-between'
                    key={status.value}
                    onSelect={(value) => {
                      setSelectedPriority(
                        statuses.find((s) => s.value === value) || null
                      );
                    }}
                    value={status.value}
                  >
                    <div className='flex items-center gap-3'>
                      <Checkbox />

                      <status.icon />

                      <span>{status.label}</span>
                    </div>
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

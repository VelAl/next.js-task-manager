'use client';

import { IoCloseSharp } from 'react-icons/io5';

import { usePrioritiesStore, useStatusesStore } from '@/hooks';

import { Button } from '../ui/button';

export const ResetFiltersBtn = () => {
  const { selectedPriorities, setSelectedPriorities } = usePrioritiesStore();
  const { selectedStatuses, setSelectedStatuses } = useStatusesStore();

  if (!selectedPriorities.length && !selectedStatuses.length) return null;

  return (
    <Button
      className='h-10'
      onClick={() => {
        setSelectedPriorities([]);
        setSelectedStatuses([]);
      }}
      variant={'ghost'}
    >
      <span>Reset</span>
      <IoCloseSharp />
    </Button>
  );
};

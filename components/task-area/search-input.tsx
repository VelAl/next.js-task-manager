'use client';

import { useSearchQueryStore } from '@/hooks';

import { Input } from '../ui/input';

export const SearchInput = () => {
  const { searchQuery, setSearchQuery } = useSearchQueryStore(); // zustand

  return (
    <Input
      className='h-10'
      onChange={({ target: { value } }) => setSearchQuery(value)}
      placeholder='Search tasks...'
      type='text'
      value={searchQuery}
    />
  );
};

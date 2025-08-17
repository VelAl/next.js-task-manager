'use client';

import { useSearchQueryStore } from '@/hooks';

import { Input } from '../ui/input';

export const SearchInput = () => {
  const { searchQuery, setSearchQuery } = useSearchQueryStore(); // zustand

  return (
    <Input
      type='text'
      placeholder='Search tasks...'
      className='h-10'
      value={searchQuery}
      onChange={({ target: { value } }) => setSearchQuery(value)}
    />
  );
};

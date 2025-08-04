import { create } from 'zustand';

type SearchQueryState = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};

export const useSearchQueryStore = create<SearchQueryState>((set) => ({
  searchQuery: 'fix',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));

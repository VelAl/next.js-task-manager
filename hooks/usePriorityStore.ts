import { create } from 'zustand';

import { T_Priority } from '@/app-types';

type T_PrioritiesState = {
  selectedPriorities: T_Priority[];
  setSelectedPriorities: (priorities: T_Priority[]) => void;
};

export const usePrioritiesStore = create<T_PrioritiesState>((set) => ({
  selectedPriorities: [],
  setSelectedPriorities: (selectedPriorities) => set({ selectedPriorities }),
}));

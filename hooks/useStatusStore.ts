import { create } from 'zustand';

import { E_TaskStatus } from '@/app-types';

type T_StatusesState = {
  selectedStatuses: E_TaskStatus[];
  setSelectedStatuses: (statuses: E_TaskStatus[]) => void;
};

export const useStatusesStore = create<T_StatusesState>((set) => ({
  selectedStatuses: [],
  setSelectedStatuses: (selectedStatuses) => set({ selectedStatuses }),
}));

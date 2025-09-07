import { create } from 'zustand';

import { T_TaskStatus } from '@/app-types';

type T_StatusesState = {
  selectedStatuses: T_TaskStatus[];
  setSelectedStatuses: (statuses: T_TaskStatus[]) => void;
};

export const useStatusesStore = create<T_StatusesState>((set) => ({
  selectedStatuses: [],
  setSelectedStatuses: (selectedStatuses) => set({ selectedStatuses }),
}));

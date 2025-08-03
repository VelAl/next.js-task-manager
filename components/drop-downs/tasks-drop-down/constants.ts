import { Copy, Edit2, Star } from 'lucide-react';
import { T_MenuItemType } from './types';
import { T_TaskType } from '@/app-types';

export const MENU_ITEMS: T_MenuItemType[] = [
  {
    icon: Edit2,
    label: 'Edit',
    kind: 'edit',
    shortcut: '⇧⌘E',
  },
  {
    icon: Copy,
    label: 'Make a Copy',
    kind: 'copy',
    shortcut: '⌘C',
  },
  {
    icon: Star,
    label: 'Favorite',
    kind: 'favorite',
    shortcut: '⌘S',
  },
];

export const TASK_TYPE_LABELS: T_TaskType[] = [
  'Bug',
  'Feature',
  'Documentation',
] as const;

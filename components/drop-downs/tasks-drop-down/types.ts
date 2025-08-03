// import { ToastActionElement } from '@/components/ui/toast';
import { LucideIcon } from 'lucide-react';

export type T_Kind = 'edit' | 'copy' | 'favorite' | 'delete';

// export interface ToastFunction {
//   (props: {
//     variant?: 'default' | 'destructive' | 'success' | 'info';
//     title: string;
//     description?: string;
//     action?: ToastActionElement;
//   }): void;
// }

export interface T_MenuItemType {
  icon: LucideIcon;
  label: string;
  kind: T_Kind;
  shortcut: string;
}

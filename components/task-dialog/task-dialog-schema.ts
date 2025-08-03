import { z } from 'zod';

export const taskFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  status: z.enum(['Backlog', 'Todo', 'In Progress', 'Done', 'Canceled']),
  priority: z.enum(['Low', 'Medium', 'High']),
  type: z.enum(['Bug', 'Documentation', 'Feature']),
});

// Infer the type from the schema
export type T_TaskFormData = z.infer<typeof taskFormSchema>;

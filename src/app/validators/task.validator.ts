import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().max(225),
  status: z.enum(['pending', 'in-progress', 'completed']).optional(),
  userId: z.string().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['pending', 'in-progress', 'completed']).optional(),
});

export const taskQueryParamsSchema = z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(10),
    status: z.enum(['pending', 'in-progress', 'completed']).optional(),
});
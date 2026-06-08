import { z } from 'zod';

export const categoryQueryPaginationSchema = z.object({
  page: z.coerce.number().int().min(1, 'page deve ser >= 1').default(1),
  size: z.coerce.number().int().min(1).max(100, 'size deve ser entre 1 e 100').default(10),
});

export const categoryParamsSchema = z.object({
  id: z.string().uuid({ message: 'O id deve ser um UUID válido.' }),
});

export const createCategorySchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
});

export const updateCategorySchema = createCategorySchema.partial();

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

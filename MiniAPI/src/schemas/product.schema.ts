import { z } from 'zod';

export const productParamsSchema = z.object({
  id: z.string().uuid({ message: 'O id deve ser um UUID válido.' }),
});

export const productQuerySchema = z.object({
  page: z.coerce.number().int().min(1, 'page deve ser >= 1').default(1),
  size: z.coerce.number().int().min(1).max(100, 'size deve ser entre 1 e 100').default(10),
});

export const createProductSchema = z.object({
  name:       z.string().min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
  price:      z.number('O preço deve ser um número.').positive({ message: 'O preço deve ser um número positivo.' }),
  stock:      z.number().int().min(0, { message: 'O estoque não pode ser negativo.' }).default(0),
  categoryId: z.string().uuid({ message: 'categoryId deve ser um UUID válido.' }),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

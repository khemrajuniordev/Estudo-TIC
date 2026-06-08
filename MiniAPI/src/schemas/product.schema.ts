import { z } from 'zod';

export const productParamsSchema = z.object({
  id: z.string().uuid({ message: 'O id deve ser um UUID válido.' }),
});

export const productQuerySchema = z.object({
  category: z.string().uuid({ message: 'O parâmetro category deve ser um UUID válido.' }).optional(),
});

export const createProductSchema = z.object({
  name:       z.string().min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
  price:      z.number('O preço deve ser um número.').positive({ message: 'O preço deve ser um número positivo.' }),
  categoryId: z.string().uuid({ message: 'categoryId deve ser um UUID válido.' }),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

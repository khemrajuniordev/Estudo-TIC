import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { productEntities } from '../store';
import type { CreateProductInput } from '../schemas/product.schema';

export const productController = {
  list(req: Request, res: Response): void {
    const { category } = req.query as { category?: string };

    const result = category
      ? productEntities.filter((p) => p.categoryId === category)
      : productEntities;

    res.json(result);
  },

  create(req: Request<object, object, CreateProductInput>, res: Response): void {
    const { name, price, categoryId } = req.body;
    const newProduct = { id: randomUUID(), name, price, categoryId, createdAt: new Date().toISOString() };
    productEntities.push(newProduct);
    res.status(201).json(newProduct);
  },

  delete(req: Request, res: Response): void {
    const { id } = req.params;
    const index = productEntities.findIndex((p) => p.id === id);

    if (index === -1) {
      res.status(404).json({ error: `Produto '${id}' não encontrado.` });
      return;
    }

    productEntities.splice(index, 1);
    res.status(204).send();
  },
};

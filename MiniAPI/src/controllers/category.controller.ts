import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { categories } from '../store';
import type { CreateCategoryInput, UpdateCategoryInput } from '../schemas/category.schema';

export const categoryController = {
  list(req: Request, res: Response): void {
    const page = Number(req.query.page);
    const size = Number(req.query.size);
    const start = (page - 1) * size;

    res.json({
      data:  categories.slice(start, start + size),
      total: categories.length,
      page,
      size,
    });
  },

  getById(req: Request, res: Response): void {
    const { id } = req.params;
    const category = categories.find((c) => c.id === id);

    if (!category) {
      res.status(404).json({ error: `Categoria '${id}' não encontrada.` });
      return;
    }

    res.json(category);
  },

  create(req: Request<object, object, CreateCategoryInput>, res: Response): void {
    const { name } = req.body;
    const newCategory = { id: randomUUID(), name, createdAt: new Date().toISOString() };
    categories.push(newCategory);
    res.status(201).json(newCategory);
  },

  update(req: Request<{ id: string }, object, UpdateCategoryInput>, res: Response): void {
    const { id } = req.params;
    const index = categories.findIndex((c) => c.id === id);

    if (index === -1) {
      res.status(404).json({ error: `Categoria '${id}' não encontrada.` });
      return;
    }

    const { name } = req.body;
    if (name) categories[index].name = name;
    res.json(categories[index]);
  },

  delete(req: Request, res: Response): void {
    const { id } = req.params;
    const index = categories.findIndex((c) => c.id === id);

    if (index === -1) {
      res.status(404).json({ error: `Categoria '${id}' não encontrada.` });
      return;
    }

    categories.splice(index, 1);
    res.status(204).send();
  },
};

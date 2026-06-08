import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/CategoryService';
import { CategoryResponseDto, CategoryListDto } from '../dtos/category.dto';
import {
  categoryQueryPaginationSchema,
  categoryParamsSchema,
  createCategorySchema,
  updateCategorySchema,
} from '../schemas/category.schema';

export class CategoryController {
  constructor(private service: CategoryService) {}

  list = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { page, size } = categoryQueryPaginationSchema.parse(req.query);
      const result = this.service.getAll(page, size);
      res.json(CategoryListDto.create(result.data, page, size, result.total));
    } catch (err) { next(err); }
  };

  getById = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { id } = categoryParamsSchema.parse(req.params);
      const category = this.service.getById(id);
      res.json(CategoryResponseDto.create(category));
    } catch (err) { next(err); }
  };

  create = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { name } = createCategorySchema.parse(req.body);
      const category = this.service.create(name);
      res.status(201).json(CategoryResponseDto.create(category));
    } catch (err) { next(err); }
  };

  update = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { id }   = categoryParamsSchema.parse(req.params);
      const { name } = updateCategorySchema.parse(req.body);
      const category = this.service.update(id, name!);
      res.json(CategoryResponseDto.create(category));
    } catch (err) { next(err); }
  };

  delete = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { id } = categoryParamsSchema.parse(req.params);
      this.service.delete(id);
      res.status(204).send();
    } catch (err) { next(err); }
  };
}

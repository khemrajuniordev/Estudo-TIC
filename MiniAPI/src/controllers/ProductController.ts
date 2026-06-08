import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/ProductService';
import { ProductResponseDto, ProductListDto } from '../dtos/product.dto';
import {
  productQuerySchema,
  productParamsSchema,
  createProductSchema,
  updateProductSchema,
} from '../schemas/product.schema';

export class ProductController {
  constructor(private service: ProductService) {}

  list = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { page, size } = productQuerySchema.parse(req.query);
      const result = this.service.getAll(page, size);
      res.json(ProductListDto.create(result.data, page, size, result.total));
    } catch (err) { next(err); }
  };

  getById = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { id } = productParamsSchema.parse(req.params);
      const product = this.service.getById(id);
      res.json(ProductResponseDto.create(product));
    } catch (err) { next(err); }
  };

  create = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { name, price, stock, categoryId } = createProductSchema.parse(req.body);
      const product = this.service.create(name, price, stock, categoryId);
      res.status(201).json(ProductResponseDto.create(product));
    } catch (err) { next(err); }
  };

  update = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { id }                          = productParamsSchema.parse(req.params);
      const { name, price, stock, categoryId } = updateProductSchema.parse(req.body);
      const product = this.service.update(id, name, price, stock, categoryId);
      res.json(ProductResponseDto.create(product));
    } catch (err) { next(err); }
  };

  delete = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { id } = productParamsSchema.parse(req.params);
      this.service.delete(id);
      res.status(204).send();
    } catch (err) { next(err); }
  };
}

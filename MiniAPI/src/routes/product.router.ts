import { Router } from 'express';
import db from '../database/index';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { ProductService } from '../services/ProductService';
import { ProductController } from '../controllers/ProductController';
import { authMiddleware, authorize } from '../middlewares/auth.middleware';

const router = Router();
const controller = new ProductController(
  new ProductService(new ProductRepository(db), new CategoryRepository(db)),
);

// Rotas públicas
router.get('/',    controller.list);
router.get('/:id', controller.getById);

// Rotas protegidas — exigem autenticação + role admin
router.post(  '/',    authMiddleware, authorize('admin'), controller.create);
router.put(   '/:id', authMiddleware, authorize('admin'), controller.update);
router.delete('/:id', authMiddleware, authorize('admin'), controller.delete);

export default router;

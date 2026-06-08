import { Router } from 'express';
import db from '../database/index';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { CategoryService } from '../services/CategoryService';
import { CategoryController } from '../controllers/CategoryController';
import { authMiddleware, authorize } from '../middlewares/auth.middleware';

const router = Router();
const controller = new CategoryController(
  new CategoryService(new CategoryRepository(db)),
);

// Rotas públicas
router.get('/',    controller.list);
router.get('/:id', controller.getById);

// Rotas protegidas — exigem autenticação + role admin
router.post(  '/',    authMiddleware, authorize('admin'), controller.create);
router.put(   '/:id', authMiddleware, authorize('admin'), controller.update);
router.delete('/:id', authMiddleware, authorize('admin'), controller.delete);

export default router;

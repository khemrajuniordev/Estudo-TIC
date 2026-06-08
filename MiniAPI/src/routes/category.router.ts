import { Router } from 'express';
import { validateData } from '../middlewares/validateData';
import { categoryController } from '../controllers/category.controller';
import {
  categoryQueryPaginationSchema,
  categoryParamsSchema,
  createCategorySchema,
  updateCategorySchema,
} from '../schemas/category.schema';

const router = Router();

router.get(   '/',    validateData(categoryQueryPaginationSchema, 'query'),  categoryController.list);
router.get(   '/:id', validateData(categoryParamsSchema, 'params'),           categoryController.getById);
router.post(  '/',    validateData(createCategorySchema),                     categoryController.create);
router.put(   '/:id', validateData(categoryParamsSchema, 'params'), validateData(updateCategorySchema), categoryController.update);
router.delete('/:id', validateData(categoryParamsSchema, 'params'),           categoryController.delete);

export default router;

import { Router } from 'express';
import { validateData } from '../middlewares/validateData';
import { productController } from '../controllers/product.controller';
import { productParamsSchema, productQuerySchema, createProductSchema } from '../schemas/product.schema';

const router = Router();

router.get(   '/',    validateData(productQuerySchema, 'query'),   productController.list);
router.post(  '/',    validateData(createProductSchema),            productController.create);
router.delete('/:id', validateData(productParamsSchema, 'params'), productController.delete);

export default router;

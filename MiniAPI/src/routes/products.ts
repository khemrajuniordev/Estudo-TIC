import { Router, Request, Response } from 'express';
import { products } from '../data';

const router = Router();

/**
 * GET /products
 * Query: ?category=eletronicos  (opcional)
 * Retorna todos os produtos ou filtrados por categoria.
 */
router.get('/', (req: Request, res: Response): void => {
  const { category } = req.query;

  if (category && typeof category === 'string') {
    const filtered = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    );
    res.json(filtered);
    return;
  }

  res.json(products);
});

/**
 * GET /products/:id
 * Param: id (número positivo)
 * Regra: ID negativo → 400 Bad Request
 */
router.get('/:id', (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: 'O parâmetro id deve ser um número.' });
    return;
  }

  if (id < 0) {
    res.status(400).json({ error: 'ID inválido: não são permitidos números negativos.' });
    return;
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    res.status(404).json({ error: `Produto com id ${id} não encontrado.` });
    return;
  }

  res.json(product);
});

export default router;

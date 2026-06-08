import { Router, Request, Response } from 'express';
import type { OrderBody, OrderStatusBody } from '../data';

const router = Router();

/**
 * POST /orders
 * Body: { customerName: string, productIds: number[] }
 * Retorna 201 Created com o pedido criado.
 * Retorna 400 se o body estiver vazio ou incompleto.
 */
router.post('/', (req: Request<object, object, Partial<OrderBody>>, res: Response): void => {
  const body = req.body;

  if (!body || Object.keys(body).length === 0) {
    res.status(400).json({ error: 'Corpo da requisição não pode ser vazio.' });
    return;
  }

  const { customerName, productIds } = body;

  if (!customerName || !productIds || !Array.isArray(productIds)) {
    res.status(400).json({
      error: 'Os campos customerName (string) e productIds (array) são obrigatórios.',
    });
    return;
  }

  const order = {
    id: Date.now(),
    customerName,
    productIds,
    status: 'pendente',
    createdAt: new Date().toISOString(),
  };

  res.status(201).json(order);
});

/**
 * PATCH /orders/:id
 * Param: id do pedido
 * Body: { status: string }  ex: { status: "pago" }
 */
router.patch('/:id', (req: Request<{ id: string }, object, Partial<OrderStatusBody>>, res: Response): void => {
  const orderId = parseInt(req.params.id, 10);
  const { status } = req.body;

  if (isNaN(orderId)) {
    res.status(400).json({ error: 'O parâmetro id deve ser um número.' });
    return;
  }

  if (!status) {
    res.status(400).json({ error: 'O campo status é obrigatório no body.' });
    return;
  }

  res.json({
    id: orderId,
    status,
    updatedAt: new Date().toISOString(),
    message: `Pedido #${orderId} atualizado para "${status}".`,
  });
});

/**
 * DELETE /orders/:id
 * Retorna 204 No Content.
 */
router.delete('/:id', (req: Request<{ id: string }>, res: Response): void => {
  res.status(204).send();
});

export default router;

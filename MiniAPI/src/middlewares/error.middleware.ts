import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Dados de entrada inválidos.',
      details: err.flatten().fieldErrors,
    });
    return;
  }

  console.error('[Erro inesperado]', err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
}

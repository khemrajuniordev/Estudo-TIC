import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const now  = new Date();
  const date = now.toLocaleDateString('pt-BR');
  const time = now.toLocaleTimeString('pt-BR');
  console.log(`[${date} ${time}] ${req.method} ${req.url}`);
  next();
}

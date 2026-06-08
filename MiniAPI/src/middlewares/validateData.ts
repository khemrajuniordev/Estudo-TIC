import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

type Source = 'body' | 'query' | 'params';

/**
 * Middleware factory que valida os dados de uma requisição usando um schema Zod.
 * Intercepta a requisição antes do controller e devolve 400 se houver erros.
 * Após validação bem-sucedida, substitui os dados brutos pelos dados coercidos/validados.
 */
export function validateData(schema: z.ZodType, source: Source = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      res.status(400).json({
        error: 'Dados de entrada inválidos.',
        details: result.error.flatten().fieldErrors,
      });
      return;
    }

    // Substitui os dados brutos pelos dados validados (importante para coerção de tipos)
    (req as unknown as Record<string, unknown>)[source] = result.data;
    next();
  };
}

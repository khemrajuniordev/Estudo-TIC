import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../database/index';
import { loginSchema } from '../schemas/auth.schema';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../middlewares/auth.middleware';
import { AppError } from '../errors/AppError';

interface UserRow {
  id: string;
  email: string;
  password: string;
  role: string;
}

export class AuthController {
  login = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const user = db.get('SELECT * FROM users WHERE email = ?', [email]) as unknown as UserRow | undefined;

      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new AppError('E-mail ou senha inválidos.', 401);
      }

      const token = jwt.sign(
        { sub: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN },
      );

      res.json({ token, role: user.role });
    } catch (err) { next(err); }
  };
}

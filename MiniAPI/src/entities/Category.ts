import { randomUUID } from 'crypto';
import { AppError } from '../errors/AppError';

export class Category {
  private constructor(
    public readonly id: string,
    public name: string,
    public readonly createdAt: string,
  ) {}

  static create(name: string): Category {
    if (!name || name.trim().length < 3) {
      throw new AppError('O nome da categoria deve ter no mínimo 3 caracteres.');
    }
    return new Category(randomUUID(), name.trim(), new Date().toISOString());
  }

  // Reconstrói a entity a partir de uma linha do banco sem revalidar
  static fromRow(id: string, name: string, createdAt: string): Category {
    return new Category(id, name, createdAt);
  }

  rename(newName: string): void {
    if (!newName || newName.trim().length < 3) {
      throw new AppError('O nome da categoria deve ter no mínimo 3 caracteres.');
    }
    this.name = newName.trim();
  }
}

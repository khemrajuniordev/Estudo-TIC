import { randomUUID } from 'crypto';
import { AppError } from '../errors/AppError';

export class Product {
  private constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    public stock: number,
    public readonly categoryId: string,
    public readonly createdAt: string,
  ) {}

  static create(name: string, price: number, stock: number, categoryId: string): Product {
    if (!name || name.trim().length < 3) {
      throw new AppError('O nome do produto deve ter no mínimo 3 caracteres.');
    }
    if (price <= 0) throw new AppError('O preço deve ser um valor positivo.');
    if (stock < 0)  throw new AppError('O estoque não pode ser negativo.');

    return new Product(randomUUID(), name.trim(), price, stock, categoryId, new Date().toISOString());
  }

  static fromRow(id: string, name: string, price: number, stock: number, categoryId: string, createdAt: string): Product {
    return new Product(id, name, price, stock, categoryId, createdAt);
  }

  update(name?: string, price?: number, stock?: number): void {
    if (name !== undefined) {
      if (name.trim().length < 3) throw new AppError('O nome do produto deve ter no mínimo 3 caracteres.');
      this.name = name.trim();
    }
    if (price !== undefined) {
      if (price <= 0) throw new AppError('O preço deve ser um valor positivo.');
      this.price = price;
    }
    if (stock !== undefined) {
      if (stock < 0) throw new AppError('O estoque não pode ser negativo.');
      this.stock = stock;
    }
  }
}

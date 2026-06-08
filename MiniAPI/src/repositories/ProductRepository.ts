import { Database } from 'node-sqlite3-wasm';
import { Product } from '../entities/Product';

interface ProductRow {
  id: string;
  name: string;
  price: number;
  stock: number;
  category_id: string;
  created_at: string;
}

export class ProductRepository {
  constructor(private db: Database) {}

  createProduct(product: Product): Product {
    // INSERT INTO products (id, name, price, stock, category_id, created_at) VALUES (?, ?, ?, ?, ?, ?)
    this.db.run(
      'INSERT INTO products (id, name, price, stock, category_id, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [product.id, product.name, product.price, product.stock, product.categoryId, product.createdAt],
    );
    return product;
  }

  getAllProducts(page: number, size: number): { data: Product[]; total: number } {
    const offset = (page - 1) * size;

    // SELECT id, name, price, stock, category_id, created_at FROM products LIMIT ? OFFSET ?
    const rows = this.db.all(
      'SELECT id, name, price, stock, category_id, created_at FROM products LIMIT ? OFFSET ?',
      [size, offset],
    ) as unknown as ProductRow[];

    // SELECT COUNT(*) as count FROM products
    const { count } = this.db.get('SELECT COUNT(*) as count FROM products') as unknown as { count: number };

    return {
      data:  rows.map((r) => Product.fromRow(r.id, r.name, r.price, r.stock, r.category_id, r.created_at)),
      total: count,
    };
  }

  getProductById(id: string): Product | null {
    // SELECT * FROM products WHERE id = ?
    const row = this.db.get(
      'SELECT id, name, price, stock, category_id, created_at FROM products WHERE id = ?',
      [id],
    ) as unknown as ProductRow | undefined;
    return row ? Product.fromRow(row.id, row.name, row.price, row.stock, row.category_id, row.created_at) : null;
  }

  updateProduct(product: Product): Product {
    // UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?
    this.db.run(
      'UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?',
      [product.name, product.price, product.stock, product.id],
    );
    return product;
  }

  deleteProduct(id: string): void {
    // DELETE FROM products WHERE id = ?
    this.db.run('DELETE FROM products WHERE id = ?', [id]);
  }
}

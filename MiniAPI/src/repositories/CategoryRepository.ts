import { Database } from 'node-sqlite3-wasm';
import { Category } from '../entities/Category';

interface CategoryRow {
  id: string;
  name: string;
  created_at: string;
}

export class CategoryRepository {
  constructor(private db: Database) {}

  createCategory(category: Category): Category {
    // INSERT INTO categories (id, name, created_at) VALUES (?, ?, ?)
    this.db.run(
      'INSERT INTO categories (id, name, created_at) VALUES (?, ?, ?)',
      [category.id, category.name, category.createdAt],
    );
    return category;
  }

  getAllCategories(page: number, size: number): { data: Category[]; total: number } {
    const offset = (page - 1) * size;

    // SELECT * FROM categories LIMIT ? OFFSET ?
    const rows = this.db.all('SELECT * FROM categories LIMIT ? OFFSET ?', [size, offset]) as unknown as CategoryRow[];

    // SELECT COUNT(*) as count FROM categories
    const { count } = this.db.get('SELECT COUNT(*) as count FROM categories') as unknown as { count: number };

    return {
      data:  rows.map((r) => Category.fromRow(r.id, r.name, r.created_at)),
      total: count,
    };
  }

  getCategoryById(id: string): Category | null {
    // SELECT * FROM categories WHERE id = ?
    const row = this.db.get('SELECT * FROM categories WHERE id = ?', [id]) as unknown as CategoryRow | undefined;
    return row ? Category.fromRow(row.id, row.name, row.created_at) : null;
  }

  updateCategory(category: Category): Category {
    // UPDATE categories SET name = ? WHERE id = ?
    this.db.run('UPDATE categories SET name = ? WHERE id = ?', [category.name, category.id]);
    return category;
  }

  deleteCategory(id: string): void {
    // DELETE FROM categories WHERE id = ?
    this.db.run('DELETE FROM categories WHERE id = ?', [id]);
  }
}

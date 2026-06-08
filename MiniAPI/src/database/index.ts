import { Database } from 'node-sqlite3-wasm';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';

const db = new Database(':memory:');

db.exec(`
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS categories (
    id         TEXT    PRIMARY KEY,
    name       TEXT    NOT NULL UNIQUE,
    created_at TEXT    NOT NULL
  );

  CREATE TABLE IF NOT EXISTS products (
    id          TEXT    PRIMARY KEY,
    name        TEXT    NOT NULL,
    price       REAL    NOT NULL,
    stock       INTEGER NOT NULL DEFAULT 0,
    category_id TEXT    NOT NULL REFERENCES categories(id),
    created_at  TEXT    NOT NULL
  );

  CREATE TABLE IF NOT EXISTS users (
    id       TEXT PRIMARY KEY,
    email    TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role     TEXT NOT NULL DEFAULT 'customer'
  );
`);

// --- Seed ---
const now = new Date().toISOString();

const adminHash = bcrypt.hashSync('admin123', 10);
db.run(
  'INSERT OR IGNORE INTO users (id, email, password, role) VALUES (?, ?, ?, ?)',
  [randomUUID(), 'admin@api.com', adminHash, 'admin'],
);

const elId   = randomUUID();
const periphId = randomUUID();

db.run('INSERT OR IGNORE INTO categories (id, name, created_at) VALUES (?, ?, ?)', [elId,     'Eletrônicos', now]);
db.run('INSERT OR IGNORE INTO categories (id, name, created_at) VALUES (?, ?, ?)', [periphId, 'Periféricos', now]);

db.run('INSERT OR IGNORE INTO products (id, name, price, stock, category_id, created_at) VALUES (?, ?, ?, ?, ?, ?)', [randomUUID(), 'Notebook Pro', 4500.00, 10, elId,     now]);
db.run('INSERT OR IGNORE INTO products (id, name, price, stock, category_id, created_at) VALUES (?, ?, ?, ?, ?, ?)', [randomUUID(), 'Mouse Gamer',  250.00,  50, periphId, now]);
db.run('INSERT OR IGNORE INTO products (id, name, price, stock, category_id, created_at) VALUES (?, ?, ?, ?, ?, ?)', [randomUUID(), 'Monitor 4K',   2800.00,  8, elId,     now]);

export default db;

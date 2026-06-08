import { randomUUID } from 'crypto';

export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export interface ProductEntity {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  createdAt: string;
}

// IDs fixos para facilitar testes manuais durante a sessão
export const ELETRONICOS_ID = randomUUID();
export const PERIFERICOS_ID  = randomUUID();

export const categories: Category[] = [
  { id: ELETRONICOS_ID, name: 'Eletrônicos', createdAt: new Date().toISOString() },
  { id: PERIFERICOS_ID,  name: 'Periféricos',  createdAt: new Date().toISOString() },
];

export const productEntities: ProductEntity[] = [
  { id: randomUUID(), name: 'Notebook Pro', price: 4500.00, categoryId: ELETRONICOS_ID, createdAt: new Date().toISOString() },
  { id: randomUUID(), name: 'Mouse Gamer',  price:  250.00, categoryId: PERIFERICOS_ID,  createdAt: new Date().toISOString() },
  { id: randomUUID(), name: 'Teclado RGB',  price:  380.00, categoryId: PERIFERICOS_ID,  createdAt: new Date().toISOString() },
  { id: randomUUID(), name: 'Monitor 4K',   price: 2800.00, categoryId: ELETRONICOS_ID, createdAt: new Date().toISOString() },
  { id: randomUUID(), name: 'Headset Pro',  price:  450.00, categoryId: PERIFERICOS_ID,  createdAt: new Date().toISOString() },
  { id: randomUUID(), name: 'Webcam HD',    price:  350.00, categoryId: PERIFERICOS_ID,  createdAt: new Date().toISOString() },
];

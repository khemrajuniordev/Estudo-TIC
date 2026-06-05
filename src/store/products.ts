import type { Product } from '../models/Product';
import type { Category } from '../models/Category';

const eletronicos: Category = { id: 1, title: 'Eletrônicos' };
const perifericos: Category = { id: 2, title: 'Periféricos' };

export const products: Product[] = [
  { id: 1, name: 'Notebook Pro',  price: 4500.00, category: eletronicos },
  { id: 2, name: 'Mouse Gamer',   price:  250.00, category: perifericos },
  { id: 3, name: 'Teclado RGB',   price:  380.00, category: perifericos },
  { id: 4, name: 'Monitor 4K',    price: 2800.00, category: eletronicos },
  { id: 5, name: 'Headset Pro',   price:  450.00, category: perifericos },
  { id: 6, name: 'Webcam HD',     price:  350.00, category: perifericos },
];

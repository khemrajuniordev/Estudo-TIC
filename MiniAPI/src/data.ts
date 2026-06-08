export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface OrderBody {
  customerName: string;
  productIds: number[];
}

export interface OrderStatusBody {
  status: string;
}

export const products: Product[] = [
  { id: 1, name: 'Notebook Pro', price: 4500.00, category: 'eletronicos' },
  { id: 2, name: 'Mouse Gamer',  price:  250.00, category: 'perifericos' },
  { id: 3, name: 'Teclado RGB',  price:  380.00, category: 'perifericos' },
  { id: 4, name: 'Monitor 4K',   price: 2800.00, category: 'eletronicos' },
  { id: 5, name: 'Headset Pro',  price:  450.00, category: 'perifericos' },
  { id: 6, name: 'Webcam HD',    price:  350.00, category: 'perifericos' },
];

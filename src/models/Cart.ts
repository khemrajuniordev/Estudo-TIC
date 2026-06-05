import type { Product } from './Product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export class Cart {
  items: CartItem[] = [];

  addItem(product: Product, quantity: number = 1): void {
    const index = this.items.findIndex((item) => item.product.id === product.id);
    if (index !== -1) {
      this.items[index].quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  removeUnit(productId: number): void {
    const index = this.items.findIndex((item) => item.product.id === productId);
    if (index === -1) return;
    if (this.items[index].quantity > 1) {
      this.items[index].quantity--;
    } else {
      this.items.splice(index, 1);
    }
  }

  removeItem(productId: number): void {
    const index = this.items.findIndex((item) => item.product.id === productId);
    if (index !== -1) this.items.splice(index, 1);
  }

  setQuantity(productId: number, quantity: number): void {
    const index = this.items.findIndex((item) => item.product.id === productId);
    if (index === -1) return;
    if (quantity <= 0) {
      this.items.splice(index, 1);
    } else {
      this.items[index].quantity = quantity;
    }
  }

  clear(): void {
    this.items.splice(0, this.items.length);
  }

  getTotalItems(): number {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  getFinalPrice(): number {
    return this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }
}

import { Product } from "./models";

export interface CartItem {
  product: Product;
  quantity: number;
}

export class Cart {
  private items: CartItem[] = [];

  addItem(product: Product, quantity: number): void {
    const alreadyInCart = this.items.some((item) => item.product.id === product.id);

    if (alreadyInCart) {
      this.items = this.items.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      this.items.push({ product, quantity });
    }
  }

  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getFinalPrice(): number {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  getItems(): CartItem[] {
    return this.items;
  }
}

<template>
  <div class="layout">
    <!-- Catálogo -->
    <main class="catalog">
      <h1>🛍️ E-commerce</h1>
      <div class="product-grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
        />
      </div>
    </main>

    <!-- Carrinho -->
    <aside class="cart-panel">
      <h2>🛒 Carrinho</h2>

      <p v-if="cart.items.length === 0" class="empty">Carrinho vazio</p>

      <table v-else class="cart-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Qtd</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.items" :key="item.product.id">
            <td>{{ item.product.name }}</td>
            <td class="qty">
              <button class="btn-qty" @click="removeUnit(item.product.id)">−</button>
              {{ item.quantity }}
              <button class="btn-qty" @click="addToCart(item.product)">+</button>
            </td>
            <td>R$ {{ (item.product.price * item.quantity).toFixed(2) }}</td>
            <td>
              <button class="btn-remove" @click="removeItem(item.product.id)" title="Remover">✕</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="cart-totals">
        <p>Total de unidades: <strong>{{ totalItems }}</strong></p>
        <p class="final-price">Valor final: <strong>R$ {{ finalPrice }}</strong></p>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Cart } from './models/Cart';
import type { Product } from './models/Product';
import type { Category } from './models/Category';
import ProductCard from './components/ProductCard.vue';

export default defineComponent({
  name: 'App',

  components: { ProductCard },

  data() {
    const eletronicos: Category = { id: 1, title: 'Eletrônicos' };
    const perifericos: Category = { id: 2, title: 'Periféricos' };

    return {
      cart: new Cart(),
      products: [
        { id: 1, name: 'Notebook Pro',  price: 4500.00, category: eletronicos },
        { id: 2, name: 'Mouse Gamer',   price:  250.00, category: perifericos },
        { id: 3, name: 'Teclado RGB',   price:  380.00, category: perifericos },
        { id: 4, name: 'Monitor 4K',    price: 2800.00, category: eletronicos },
        { id: 5, name: 'Headset Pro',   price:  450.00, category: perifericos },
      ] as Product[],
    };
  },

  computed: {
    totalItems(): number {
      return this.cart.getTotalItems();
    },
    finalPrice(): string {
      return this.cart.getFinalPrice().toFixed(2);
    },
  },

  methods: {
    addToCart(product: Product): void {
      this.cart.addItem(product);
    },
    removeUnit(productId: number): void {
      this.cart.removeUnit(productId);
    },
    removeItem(productId: number): void {
      this.cart.removeItem(productId);
    },
  },
});
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', sans-serif; background: #f0f2f5; color: #333; }

.layout {
  display: flex;
  min-height: 100vh;
}

.catalog {
  flex: 1;
  padding: 2rem;
}
.catalog h1 {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #2c3e50;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.cart-panel {
  width: 340px;
  background: #fff;
  padding: 2rem 1.5rem;
  box-shadow: -2px 0 10px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.cart-panel h2 {
  font-size: 1.3rem;
  color: #2c3e50;
}
.empty {
  color: #999;
  font-style: italic;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}
.cart-table th {
  text-align: left;
  padding: 6px 4px;
  border-bottom: 2px solid #eee;
  color: #666;
  font-weight: 600;
}
.cart-table td {
  padding: 8px 4px;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
}

.qty {
  display: flex;
  align-items: center;
  gap: 6px;
}
.btn-qty {
  width: 24px;
  height: 24px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f8f8f8;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1;
}
.btn-qty:hover { background: #e8e8e8; }

.btn-remove {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 2px 6px;
  border-radius: 4px;
}
.btn-remove:hover { background: #fdecea; }

.cart-totals {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 2px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.95rem;
}
.final-price {
  font-size: 1.1rem;
  color: #27ae60;
}
</style>

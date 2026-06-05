<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Nossos Produtos</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { products } from '../store/products';
import { cartStore } from '../store/cart';
import type { Product } from '../models/Product';

export default defineComponent({
  name: 'HomeView',
  components: { ProductCard },

  data() {
    return { products };
  },

  methods: {
    addToCart(product: Product): void {
      cartStore.cart.addItem(product);
    },
  },
});
</script>

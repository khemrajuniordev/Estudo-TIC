<template>
  <div class="product-card">
    <span class="badge">{{ product.category.title }}</span>
    <h3>{{ product.name }}</h3>
    <p class="price">R$ {{ product.price.toFixed(2) }}</p>
    <button class="btn-add" @click="$emit('add-to-cart', product)">+ Adicionar</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Product } from '../models/Product';

export default defineComponent({
  name: 'ProductCard',

  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },

  emits: {
    'add-to-cart': (product: Product) => !!product,
  },
});
</script>

<style scoped>
.product-card {
  background: #fff;
  border-radius: 10px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.badge {
  font-size: 0.72rem;
  background: #e8f4fd;
  color: #2980b9;
  padding: 2px 8px;
  border-radius: 20px;
  align-self: flex-start;
  font-weight: 600;
}
h3 {
  margin: 0;
  font-size: 1rem;
  color: #2c3e50;
}
.price {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #27ae60;
}
.btn-add {
  margin-top: auto;
  padding: 0.5rem;
  background: #27ae60;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}
.btn-add:hover {
  background: #219a52;
}
</style>

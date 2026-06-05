<template>
  <div>
    <Button label="Voltar" icon="pi pi-arrow-left" text severity="secondary" class="mb-4" @click="$router.back()" />

    <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Imagem placeholder -->
      <Card class="flex items-center justify-center bg-gray-100 dark:bg-gray-800 min-h-64 shadow-none">
        <template #content>
          <i class="pi pi-box text-6xl text-gray-300 dark:text-gray-600" />
        </template>
      </Card>

      <!-- Detalhes -->
      <Card class="shadow-lg">
        <template #content>
          <div class="flex flex-col gap-4">
            <span class="text-xs font-semibold px-2 py-1 rounded-full self-start bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              {{ product.category.title }}
            </span>
            <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">{{ product.name }}</h1>
            <p class="text-3xl font-extrabold text-green-600 dark:text-green-400">
              R$ {{ product.price.toFixed(2) }}
            </p>
            <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Produto de alta qualidade, garantia de 12 meses. Entrega em até 5 dias úteis para todo o Brasil.
            </p>

            <div class="flex items-center gap-3 mt-2">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Quantidade:</label>
              <InputNumber
                v-model="qty"
                :min="1"
                :max="99"
                show-buttons
                button-layout="horizontal"
                :input-style="{ width: '3rem', textAlign: 'center' }"
              />
            </div>

            <Button
              label="Adicionar ao Carrinho"
              icon="pi pi-cart-plus"
              size="large"
              class="w-full mt-2"
              @click="addToCart"
            />
          </div>
        </template>
      </Card>
    </div>

    <div v-else class="text-center py-16">
      <i class="pi pi-exclamation-circle text-4xl text-gray-400 mb-4 block" />
      <p class="text-gray-500">Produto não encontrado.</p>
      <Button label="Ver catálogo" class="mt-4" @click="$router.push('/')" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import { products } from '../store/products';
import { cartStore } from '../store/cart';
import type { Product } from '../models/Product';

export default defineComponent({
  name: 'ProductDetailView',
  components: { Card, Button, InputNumber },

  data() {
    return { qty: 1 };
  },

  computed: {
    product(): Product | undefined {
      const id = Number(this.$route.params.id);
      return products.find((p) => p.id === id);
    },
  },

  methods: {
    addToCart(): void {
      if (!this.product) return;
      cartStore.cart.addItem(this.product, this.qty);
      this.qty = 1;
    },
  },
});
</script>

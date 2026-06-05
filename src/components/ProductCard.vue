<template>
  <Card class="h-full shadow-md hover:shadow-xl transition-shadow duration-200">
    <template #content>
      <div class="flex flex-col gap-3 h-full">
        <span class="text-xs font-semibold px-2 py-1 rounded-full self-start bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
          {{ product.category.title }}
        </span>
        <h3 class="font-bold text-gray-800 dark:text-gray-100 text-base leading-tight">
          {{ product.name }}
        </h3>
        <p class="text-xl font-extrabold text-green-600 dark:text-green-400 mt-auto">
          R$ {{ product.price.toFixed(2) }}
        </p>
        <Button
          label="Adicionar"
          icon="pi pi-cart-plus"
          class="w-full"
          @click="$emit('add-to-cart', product)"
        />
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import type { Product } from '../models/Product';

export default defineComponent({
  name: 'ProductCard',
  components: { Card, Button },

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

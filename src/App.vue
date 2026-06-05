<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

    <!-- Header -->
    <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">🛍️ E-commerce</h1>
      <Button
        :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
        rounded
        text
        severity="secondary"
        :aria-label="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
        @click="toggleDark"
      />
    </header>

    <div class="flex flex-col lg:flex-row gap-6 p-6 max-w-screen-xl mx-auto">

      <!-- Catálogo de produtos -->
      <main class="flex-1">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
          />
        </div>
      </main>

      <!-- Painel do carrinho -->
      <aside class="w-full lg:w-80 xl:w-96 shrink-0">
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-5 sticky top-24">

          <!-- Cabeçalho do carrinho -->
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">🛒 Carrinho</h2>
            <Button
              v-if="cart.items.length > 0"
              label="Limpar"
              icon="pi pi-trash"
              severity="danger"
              size="small"
              text
              @click="confirmClear"
            />
          </div>

          <!-- Lista de itens com DataView -->
          <DataView :value="cart.items" data-key="product.id">
            <template #list="slotProps">
              <div class="flex flex-col divide-y divide-gray-100 dark:divide-gray-700">
                <div
                  v-for="item in (slotProps.items as CartItem[])"
                  :key="item.product.id"
                  class="flex items-center gap-3 py-3"
                >
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-sm text-gray-800 dark:text-gray-100 truncate">
                      {{ item.product.name }}
                    </p>
                    <p class="text-xs text-gray-400 dark:text-gray-500">
                      R$ {{ item.product.price.toFixed(2) }} / un
                    </p>
                  </div>

                  <InputNumber
                    :model-value="item.quantity"
                    :min="1"
                    :max="99"
                    show-buttons
                    button-layout="horizontal"
                    :step="1"
                    :input-style="{ width: '2.5rem', textAlign: 'center', padding: '0.25rem' }"
                    @update:model-value="(val) => setQty(item.product.id, val)"
                  />

                  <span class="text-sm font-bold text-green-600 dark:text-green-400 w-20 text-right shrink-0">
                    R$ {{ (item.product.price * item.quantity).toFixed(2) }}
                  </span>

                  <Button
                    icon="pi pi-times"
                    text
                    rounded
                    severity="danger"
                    size="small"
                    @click="removeItem(item.product.id)"
                  />
                </div>
              </div>
            </template>

            <!-- Empty state com Card do PrimeVue -->
            <template #empty>
              <Card class="text-center border border-dashed border-gray-200 dark:border-gray-700 shadow-none bg-transparent">
                <template #content>
                  <div class="flex flex-col items-center gap-2 py-4">
                    <i class="pi pi-shopping-cart text-4xl text-gray-300 dark:text-gray-600" />
                    <p class="font-semibold text-gray-400 dark:text-gray-500">Carrinho vazio</p>
                    <p class="text-xs text-gray-300 dark:text-gray-600">Adicione produtos para começar</p>
                  </div>
                </template>
              </Card>
            </template>
          </DataView>

          <!-- Totais -->
          <div
            v-if="cart.items.length > 0"
            class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-col gap-2"
          >
            <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Total de unidades</span>
              <strong class="text-gray-700 dark:text-gray-200">{{ totalItems }}</strong>
            </div>
            <div class="flex justify-between text-lg font-extrabold text-gray-800 dark:text-gray-100">
              <span>Total</span>
              <span class="text-green-600 dark:text-green-400">R$ {{ finalPrice }}</span>
            </div>
          </div>

        </div>
      </aside>
    </div>

    <ConfirmDialog />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import DataView from 'primevue/dataview';
import InputNumber from 'primevue/inputnumber';
import ConfirmDialog from 'primevue/confirmdialog';
import { Cart, type CartItem } from './models/Cart';
import type { Product } from './models/Product';
import type { Category } from './models/Category';
import ProductCard from './components/ProductCard.vue';

export default defineComponent({
  name: 'App',
  components: { ProductCard, Card, Button, DataView, InputNumber, ConfirmDialog },

  data() {
    const eletronicos: Category = { id: 1, title: 'Eletrônicos' };
    const perifericos: Category = { id: 2, title: 'Periféricos' };

    return {
      isDark: false,
      cart: new Cart(),
      products: [
        { id: 1, name: 'Notebook Pro', price: 4500.00, category: eletronicos },
        { id: 2, name: 'Mouse Gamer',  price:  250.00, category: perifericos },
        { id: 3, name: 'Teclado RGB',  price:  380.00, category: perifericos },
        { id: 4, name: 'Monitor 4K',   price: 2800.00, category: eletronicos },
        { id: 5, name: 'Headset Pro',  price:  450.00, category: perifericos },
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
    setQty(productId: number, val: number | null): void {
      this.cart.setQuantity(productId, val ?? 1);
    },
    removeItem(productId: number): void {
      this.cart.removeItem(productId);
    },
    confirmClear(): void {
      this.$confirm.require({
        message: 'Deseja remover todos os itens do carrinho?',
        header: 'Confirmar limpeza',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim, limpar',
        rejectLabel: 'Cancelar',
        acceptProps: { severity: 'danger' },
        rejectProps: { severity: 'secondary', outlined: true },
        accept: () => this.cart.clear(),
      });
    },
    toggleDark(): void {
      this.isDark = !this.isDark;
      document.documentElement.classList.toggle('dark', this.isDark);
    },
  },
});
</script>

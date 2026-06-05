<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

    <!-- Menubar principal -->
    <Menubar :model="menuItems" class="rounded-none border-0 border-b border-gray-200 dark:border-gray-700 px-4 sticky top-0 z-20">
      <template #start>
        <router-link to="/" class="font-extrabold text-lg text-gray-800 dark:text-gray-100 no-underline mr-4">
          🛍️ E-commerce
        </router-link>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <span v-if="authStore.user" class="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
            <i class="pi pi-user mr-1" />{{ authStore.user.username }}
          </span>
          <Button
            v-if="!authStore.isAuthenticated"
            label="Entrar"
            icon="pi pi-sign-in"
            size="small"
            @click="$router.push({ name: 'login' })"
          />
          <Button
            v-else
            label="Sair"
            icon="pi pi-sign-out"
            severity="secondary"
            size="small"
            text
            @click="doLogout"
          />
          <Button
            :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
            rounded
            text
            severity="secondary"
            @click="toggleDarkMode"
          />
        </div>
      </template>
    </Menubar>

    <!-- Conteúdo + Carrinho -->
    <div class="flex flex-col lg:flex-row gap-6 p-6 max-w-screen-xl mx-auto">

      <main class="flex-1 min-w-0">
        <router-view />
      </main>

      <!-- Sidebar do Carrinho (sempre visível) -->
      <aside class="w-full lg:w-80 xl:w-96 shrink-0">
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-5 sticky top-20">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-gray-800 dark:text-gray-100">🛒 Carrinho</h2>
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

          <DataView :value="cart.items">
            <template #list="slotProps">
              <div class="flex flex-col divide-y divide-gray-100 dark:divide-gray-700">
                <div
                  v-for="item in (slotProps.items as CartItem[])"
                  :key="item.product.id"
                  class="flex items-center gap-2 py-3"
                >
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-sm text-gray-800 dark:text-gray-100 truncate">{{ item.product.name }}</p>
                    <p class="text-xs text-gray-400">R$ {{ item.product.price.toFixed(2) }}/un</p>
                  </div>
                  <InputNumber
                    :model-value="item.quantity"
                    :min="1"
                    :max="99"
                    show-buttons
                    button-layout="horizontal"
                    :input-style="{ width: '2.5rem', textAlign: 'center', padding: '0.2rem' }"
                    @update:model-value="(v) => setQty(item.product.id, v)"
                  />
                  <span class="text-xs font-bold text-green-600 dark:text-green-400 w-16 text-right shrink-0">
                    R$ {{ (item.product.price * item.quantity).toFixed(2) }}
                  </span>
                  <Button icon="pi pi-times" text rounded severity="danger" size="small" @click="removeItem(item.product.id)" />
                </div>
              </div>
            </template>
            <template #empty>
              <Card class="shadow-none border border-dashed border-gray-200 dark:border-gray-700 bg-transparent">
                <template #content>
                  <div class="flex flex-col items-center gap-2 py-4 text-center">
                    <i class="pi pi-shopping-cart text-3xl text-gray-300 dark:text-gray-600" />
                    <p class="text-gray-400 font-medium text-sm">Carrinho vazio</p>
                  </div>
                </template>
              </Card>
            </template>
          </DataView>

          <div v-if="cart.items.length > 0" class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-col gap-2">
            <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Total de unidades</span>
              <strong class="text-gray-700 dark:text-gray-200">{{ totalItems }}</strong>
            </div>
            <div class="flex justify-between font-extrabold text-gray-800 dark:text-gray-100">
              <span>Total</span>
              <span class="text-green-600 dark:text-green-400">R$ {{ finalPrice }}</span>
            </div>
            <Button label="Finalizar Compra" icon="pi pi-credit-card" class="w-full mt-1" @click="goToCheckout" />
          </div>
        </div>
      </aside>
    </div>

    <ConfirmDialog />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import Card from 'primevue/card';
import DataView from 'primevue/dataview';
import InputNumber from 'primevue/inputnumber';
import ConfirmDialog from 'primevue/confirmdialog';
import { cartStore } from '../store/cart';
import { themeStore, toggleDark } from '../store/theme';
import { useAuthStore } from '../stores/auth';
import type { CartItem } from '../models/Cart';

export default defineComponent({
  name: 'ConsumerLayout',
  components: { Menubar, Button, Card, DataView, InputNumber, ConfirmDialog },

  setup() {
    return { authStore: useAuthStore() };
  },

  computed: {
    cart() { return cartStore.cart; },
    isDark() { return themeStore.isDark; },
    totalItems(): number { return cartStore.cart.getTotalItems(); },
    finalPrice(): string { return cartStore.cart.getFinalPrice().toFixed(2); },
    menuItems() {
      const items: { label: string; icon: string; command: () => void }[] = [
        { label: 'Início',    icon: 'pi pi-home',          command: () => this.$router.push('/') },
        { label: 'Carrinho',  icon: 'pi pi-shopping-cart', command: () => this.goToCheckout() },
      ];
      if (this.authStore.isAdmin) {
        items.push({ label: 'Painel Admin', icon: 'pi pi-shield', command: () => this.$router.push('/admin') });
      }
      return items;
    },
  },

  methods: {
    setQty(productId: number, val: number | null): void {
      cartStore.cart.setQuantity(productId, val ?? 1);
    },
    removeItem(productId: number): void {
      cartStore.cart.removeItem(productId);
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
        accept: () => cartStore.cart.clear(),
      });
    },
    goToCheckout(): void {
      if (!this.authStore.isAuthenticated) {
        this.$router.push({ name: 'login', query: { redirect: '/cart' } });
      } else {
        this.$router.push('/cart');
      }
    },
    doLogout(): void {
      this.authStore.logout();
      this.$router.push({ name: 'login' });
    },
    toggleDarkMode(): void { toggleDark(); },
  },
});
</script>

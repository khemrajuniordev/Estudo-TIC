<template>
  <div class="max-w-3xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Finalizar Compra</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <!-- Resumo do pedido -->
      <Card class="shadow-lg">
        <template #title>
          <span class="text-base font-bold">Resumo do pedido</span>
        </template>
        <template #content>
          <DataTable :value="cartItems" size="small" class="text-sm">
            <Column field="product.name" header="Produto" />
            <Column field="quantity" header="Qtd" class="w-12 text-center" />
            <Column header="Subtotal">
              <template #body="{ data }">
                R$ {{ (data.product.price * data.quantity).toFixed(2) }}
              </template>
            </Column>
          </DataTable>
          <div class="flex justify-between font-bold text-lg mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
            <span>Total</span>
            <span class="text-green-600 dark:text-green-400">R$ {{ finalPrice }}</span>
          </div>
        </template>
      </Card>

      <!-- Formulário de entrega -->
      <Card class="shadow-lg">
        <template #title>
          <span class="text-base font-bold">Dados de entrega</span>
        </template>
        <template #content>
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Nome completo</label>
              <InputText v-model="form.name" placeholder="Seu nome" class="w-full" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Endereço</label>
              <InputText v-model="form.address" placeholder="Rua, número, cidade" class="w-full" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">CEP</label>
              <InputText v-model="form.zip" placeholder="00000-000" class="w-full" />
            </div>

            <Button
              label="Confirmar Pedido"
              icon="pi pi-check"
              class="w-full mt-2"
              :disabled="cartItems.length === 0 || !form.name || !form.address"
              @click="placeOrder"
            />
          </div>
        </template>
      </Card>
    </div>

    <!-- Confirmação de pedido -->
    <div v-if="ordered" class="mt-6">
      <Card class="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950 shadow-none">
        <template #content>
          <div class="flex items-center gap-3">
            <i class="pi pi-check-circle text-2xl text-green-600" />
            <div>
              <p class="font-bold text-green-800 dark:text-green-200">Pedido realizado com sucesso!</p>
              <p class="text-sm text-green-600 dark:text-green-400">Obrigado, {{ form.name }}! Entraremos em contato em breve.</p>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { cartStore } from '../store/cart';
import type { CartItem } from '../models/Cart';

export default defineComponent({
  name: 'CartView',
  components: { Card, Button, InputText, DataTable, Column },

  data() {
    return {
      ordered: false,
      form: { name: '', address: '', zip: '' },
    };
  },

  computed: {
    cartItems(): CartItem[] { return cartStore.cart.items; },
    finalPrice(): string { return cartStore.cart.getFinalPrice().toFixed(2); },
  },

  methods: {
    placeOrder(): void {
      this.ordered = true;
      cartStore.cart.clear();
    },
  },
});
</script>

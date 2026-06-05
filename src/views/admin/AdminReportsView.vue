<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Relatórios de Vendas</h1>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card v-for="kpi in kpis" :key="kpi.label" class="shadow-md text-center">
        <template #content>
          <i :class="[kpi.icon, 'text-3xl mb-2 block', kpi.color]" />
          <p class="text-2xl font-extrabold text-gray-800 dark:text-gray-100">{{ kpi.value }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ kpi.label }}</p>
        </template>
      </Card>
    </div>

    <!-- Tabela de produtos mais populares -->
    <Card class="shadow-md">
      <template #title>
        <span class="text-base font-bold">Produtos em destaque</span>
      </template>
      <template #content>
        <DataTable :value="topProducts" size="small">
          <Column field="name" header="Produto" />
          <Column header="Categoria">
            <template #body="{ data }">
              <Tag :value="data.category.title" severity="info" />
            </template>
          </Column>
          <Column header="Preço">
            <template #body="{ data }">
              R$ {{ data.price.toFixed(2) }}
            </template>
          </Column>
          <Column header="Vendas simuladas">
            <template #body="{ data }">
              <div class="flex items-center gap-2">
                <div class="bg-green-200 dark:bg-green-800 rounded h-2 flex-1">
                  <div
                    class="bg-green-500 h-2 rounded"
                    :style="{ width: `${(data.price / 4500) * 100}%` }"
                  />
                </div>
                <span class="text-xs text-gray-500 w-8">{{ Math.round((data.price / 4500) * 100) }}%</span>
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import { products } from '../../store/products';

export default defineComponent({
  name: 'AdminReportsView',
  components: { Card, DataTable, Column, Tag },

  computed: {
    topProducts() { return products.slice(0, 4); },

    kpis() {
      const total = products.reduce((s, p) => s + p.price, 0);
      const cats  = new Set(products.map((p) => p.category.id)).size;
      return [
        { label: 'Produtos cadastrados', value: products.length,        icon: 'pi pi-box',          color: 'text-blue-500' },
        { label: 'Categorias ativas',    value: cats,                   icon: 'pi pi-tag',          color: 'text-purple-500' },
        { label: 'Valor do estoque',     value: `R$ ${total.toFixed(0)}`, icon: 'pi pi-wallet',     color: 'text-green-500' },
        { label: 'Pedidos (simulado)',   value: 42,                     icon: 'pi pi-shopping-bag', color: 'text-orange-500' },
      ];
    },
  },
});
</script>

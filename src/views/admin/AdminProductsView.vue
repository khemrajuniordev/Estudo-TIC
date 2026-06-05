<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Gerenciar Produtos</h1>
      <Button label="Novo Produto" icon="pi pi-plus" size="small" />
    </div>

    <Card class="shadow-md">
      <template #content>
        <DataTable
          :value="products"
          :paginator="true"
          :rows="5"
          striped-rows
          size="small"
          class="text-sm"
        >
          <Column field="id" header="ID" sortable class="w-16" />
          <Column field="name" header="Produto" sortable />
          <Column header="Categoria" sortable>
            <template #body="{ data }">
              <Tag :value="data.category.title" severity="info" />
            </template>
          </Column>
          <Column field="price" header="Preço" sortable>
            <template #body="{ data }">
              <span class="font-semibold text-green-600 dark:text-green-400">
                R$ {{ data.price.toFixed(2) }}
              </span>
            </template>
          </Column>
          <Column header="Ações" class="w-28">
            <template #body>
              <div class="flex gap-1">
                <Button icon="pi pi-pencil" text severity="info"   size="small" />
                <Button icon="pi pi-trash"  text severity="danger" size="small" />
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
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import { products } from '../../store/products';

export default defineComponent({
  name: 'AdminProductsView',
  components: { Card, Button, DataTable, Column, Tag },

  data() {
    return { products };
  },
});
</script>

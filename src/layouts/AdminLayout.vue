<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300 flex flex-col">

    <!-- Header admin -->
    <header class="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shrink-0">
      <div class="flex items-center gap-3">
        <i class="pi pi-shield text-yellow-400 text-xl" />
        <span class="font-bold text-lg">Painel Administrativo</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-gray-300">
          <i class="pi pi-user mr-1" />{{ currentUser?.username }}
        </span>
        <Button label="Voltar à loja" icon="pi pi-arrow-left" size="small" severity="secondary" text @click="$router.push('/')" />
        <Button :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'" rounded text severity="secondary" size="small" @click="toggleDarkMode" />
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">

      <!-- Sidebar de navegação -->
      <aside class="w-56 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shrink-0">
        <div class="p-3">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Gestão</p>
          <Menu :model="sideMenuItems" class="border-0 shadow-none w-full" />
        </div>
      </aside>

      <!-- Área principal -->
      <main class="flex-1 overflow-auto p-6">
        <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" class="mb-4 bg-transparent border-0 p-0" />
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import Breadcrumb from 'primevue/breadcrumb';
import { useAuthStore } from '../stores/auth';
import { themeStore, toggleDark } from '../store/theme';

const breadcrumbMap: Record<string, string> = {
  'admin-products': 'Produtos',
  'admin-reports':  'Relatórios',
};

export default defineComponent({
  name: 'AdminLayout',
  components: { Button, Menu, Breadcrumb },

  setup() {
    return { authStore: useAuthStore() };
  },

  data() {
    return {
      breadcrumbHome: { icon: 'pi pi-home', command: () => this.$router.push('/') },
      sideMenuItems: [
        { label: 'Produtos',    icon: 'pi pi-list',      command: () => this.$router.push('/admin/products') },
        { label: 'Relatórios',  icon: 'pi pi-chart-bar', command: () => this.$router.push('/admin/reports') },
      ],
    };
  },

  computed: {
    currentUser() { return this.authStore.user; },
    isDark() { return themeStore.isDark; },
    breadcrumbItems(): { label: string; command?: () => void }[] {
      const routeName = String(this.$route.name ?? '');
      const items: { label: string; command?: () => void }[] = [
        { label: 'Admin', command: () => this.$router.push('/admin') },
      ];
      if (breadcrumbMap[routeName]) items.push({ label: breadcrumbMap[routeName] });
      return items;
    },
  },

  methods: {
    toggleDarkMode(): void { toggleDark(); },
  },
});
</script>

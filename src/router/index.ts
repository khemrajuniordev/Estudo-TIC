import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    requiresAdmin?: boolean;
    guestOnly?: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/AuthView.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/',
      component: () => import('../layouts/ConsumerLayout.vue'),
      children: [
        { path: '', name: 'home', component: () => import('../views/HomeView.vue') },
        { path: 'product/:id', name: 'product-detail', component: () => import('../views/ProductDetailView.vue') },
        { path: 'cart', name: 'cart', component: () => import('../views/CartView.vue'), meta: { requiresAuth: true } },
      ],
    },
    {
      path: '/admin',
      component: () => import('../layouts/AdminLayout.vue'),
      meta: { requiresAdmin: true },
      children: [
        { path: '', redirect: '/admin/products' },
        { path: 'products', name: 'admin-products', component: () => import('../views/admin/AdminProductsView.vue') },
        { path: 'reports',  name: 'admin-reports',  component: () => import('../views/admin/AdminReportsView.vue') },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  // Rota só para visitantes (ex: login) — redireciona autenticados para home
  if (to.meta.guestOnly && auth.isAuthenticated) return { name: 'home' };

  // Guard de autenticação — envia para login com redirect de volta
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }

  // Guard de role — só ADMIN pode acessar área administrativa
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return auth.isAuthenticated ? { name: 'home' } : { name: 'login', query: { redirect: to.fullPath } };
  }
});

export default router;

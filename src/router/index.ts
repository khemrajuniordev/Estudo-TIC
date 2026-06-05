import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated, isAdmin } from '../store/auth';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    requiresAdmin?: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/ConsumerLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'product/:id',
          name: 'product-detail',
          component: () => import('../views/ProductDetailView.vue'),
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/CartView.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/admin',
      component: () => import('../layouts/AdminLayout.vue'),
      meta: { requiresAdmin: true },
      children: [
        { path: '', redirect: '/admin/products' },
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('../views/admin/AdminProductsView.vue'),
        },
        {
          path: 'reports',
          name: 'admin-reports',
          component: () => import('../views/admin/AdminReportsView.vue'),
        },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated()) return { name: 'home' };
  if (to.meta.requiresAdmin && !isAdmin()) return { name: 'home' };
});

export default router;

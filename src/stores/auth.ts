import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { User, Role } from '../user';

export { Role };

export const useAuthStore = defineStore('auth', () => {
  const user    = ref<User | null>(null);
  const token   = ref<string | null>(null);
  const isLoading = ref(false);

  const isAuthenticated = computed(() => user.value !== null);
  const isAdmin         = computed(() => user.value?.role === Role.ADMIN);

  async function login(email: string, _password: string): Promise<void> {
    isLoading.value = true;
    try {
      await new Promise((r) => setTimeout(r, 800));
      const role = email.toLowerCase().includes('admin') ? Role.ADMIN : Role.CUSTOMER;
      user.value  = new User(Date.now(), email.split('@')[0], email, role);
      token.value = `mock-token-${Date.now()}`;
    } finally {
      isLoading.value = false;
    }
  }

  async function register(name: string, email: string, _password: string): Promise<void> {
    isLoading.value = true;
    try {
      await new Promise((r) => setTimeout(r, 800));
      user.value  = new User(Date.now(), name, email, Role.CUSTOMER);
      token.value = `mock-token-${Date.now()}`;
    } finally {
      isLoading.value = false;
    }
  }

  function logout(): void {
    user.value  = null;
    token.value = null;
  }

  return { user, token, isLoading, isAuthenticated, isAdmin, login, register, logout };
});

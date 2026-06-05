import { reactive } from 'vue';
import { User, Role } from '../user';

interface AuthState {
  currentUser: User | null;
}

export const authStore = reactive<AuthState>({
  currentUser: null,
});

export function login(role: Role): void {
  authStore.currentUser = new User(
    role === Role.ADMIN ? 1 : 2,
    role === Role.ADMIN ? 'admin_user' : 'cliente_user',
    role === Role.ADMIN ? 'admin@loja.com' : 'cliente@loja.com',
    role,
  );
}

export function logout(): void {
  authStore.currentUser = null;
}

export function isAuthenticated(): boolean {
  return authStore.currentUser !== null;
}

export function isAdmin(): boolean {
  return authStore.currentUser?.role === Role.ADMIN;
}

export { Role };

import { reactive } from 'vue';

export const themeStore = reactive({ isDark: false });

export function toggleDark(): void {
  themeStore.isDark = !themeStore.isDark;
  document.documentElement.classList.toggle('dark', themeStore.isDark);
}

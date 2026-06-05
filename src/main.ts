import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ConfirmationService from 'primevue/confirmationservice';
import 'primeicons/primeicons.css';
import './style.css';
import router from './router';
import App from './App.vue';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: { darkModeSelector: '.dark' },
  },
});
app.use(ConfirmationService);
app.use(router);
app.mount('#app');

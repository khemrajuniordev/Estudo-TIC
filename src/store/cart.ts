import { reactive } from 'vue';
import { Cart } from '../models/Cart';

export const cartStore = reactive({
  cart: new Cart(),
});

import { createReducer, on } from '@ngrx/store';
import { CartState } from '../../models/product.model';
import * as CartActions from './cart.actions';

export const initialState: CartState = {
  items: [],
  total: 0
};

const calculateTotal = (items: any[]): number => {
  return items.reduce((sum, item) => sum + (item.product.precio * item.quantity), 0);
};

export const cartReducer = createReducer(
  initialState,

  on(CartActions.addToCart, (state, { product }) => {
    const existingItem = state.items.find(item => item.product.id === product.id);

    let newItems;
    if (existingItem) {
      newItems = state.items.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newItems = [...state.items, { product, quantity: 1 }];
    }

    const newState = {
      items: newItems,
      total: calculateTotal(newItems)
    };

    // Guardar en sessionStorage
    sessionStorage.setItem('cart', JSON.stringify(newState));

    return newState;
  }),

  on(CartActions.removeFromCart, (state, { productId }) => {
    const newItems = state.items.filter(item => item.product.id !== productId);
    const newState = {
      items: newItems,
      total: calculateTotal(newItems)
    };

    sessionStorage.setItem('cart', JSON.stringify(newState));

    return newState;
  }),

  on(CartActions.updateQuantity, (state, { productId, quantity }) => {
    if (quantity <= 0) {
      const newItems = state.items.filter(item => item.product.id !== productId);
      const newState = {
        items: newItems,
        total: calculateTotal(newItems)
      };

      sessionStorage.setItem('cart', JSON.stringify(newState));

      return newState;
    }

    const newItems = state.items.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    );

    const newState = {
      items: newItems,
      total: calculateTotal(newItems)
    };

    sessionStorage.setItem('cart', JSON.stringify(newState));

    return newState;
  }),

  on(CartActions.clearCart, () => {
    sessionStorage.removeItem('cart');
    return initialState;
  }),

  on(CartActions.loadCartFromSession, () => {
    const cartJson = sessionStorage.getItem('cart');
    if (cartJson) {
      return JSON.parse(cartJson);
    }
    return initialState;
  })
);

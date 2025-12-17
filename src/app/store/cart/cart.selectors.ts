import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from '../../models/product.model';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);

export const selectCartTotal = createSelector(
  selectCartState,
  (state) => state.total
);

export const selectCartItemCount = createSelector(
  selectCartItems,
  (items) => items.reduce((count, item) => count + item.quantity, 0)
);

export const selectIsProductInCart = (productId: number) => createSelector(
  selectCartItems,
  (items) => items.some(item => item.product.id === productId)
);

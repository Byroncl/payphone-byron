import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PurchaseState } from '../../models/purchase.model';

export const selectPurchasesState = createFeatureSelector<PurchaseState>('purchases');

export const selectAllPurchases = createSelector(
  selectPurchasesState,
  (state) => state.purchases
);

export const selectPurchasesLoading = createSelector(
  selectPurchasesState,
  (state) => state.loading
);

export const selectPurchasesError = createSelector(
  selectPurchasesState,
  (state) => state.error
);

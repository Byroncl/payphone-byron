import { createReducer, on } from '@ngrx/store';
import { PurchaseState } from '../../models/purchase.model';
import * as PurchasesActions from './purchases.actions';

export const initialState: PurchaseState = {
  purchases: [],
  loading: false,
  error: null
};

export const purchasesReducer = createReducer(
  initialState,

  // Load User Purchases
  on(PurchasesActions.loadUserPurchases, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(PurchasesActions.loadUserPurchasesSuccess, (state, { purchases }) => ({
    ...state,
    purchases,
    loading: false,
    error: null
  })),

  on(PurchasesActions.loadUserPurchasesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load All Purchases
  on(PurchasesActions.loadAllPurchases, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(PurchasesActions.loadAllPurchasesSuccess, (state, { purchases }) => ({
    ...state,
    purchases,
    loading: false,
    error: null
  })),

  on(PurchasesActions.loadAllPurchasesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create Purchase
  on(PurchasesActions.createPurchase, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(PurchasesActions.createPurchaseSuccess, (state, { purchase }) => ({
    ...state,
    purchases: [purchase, ...state.purchases],
    loading: false,
    error: null
  })),

  on(PurchasesActions.createPurchaseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Purchase Status
  on(PurchasesActions.updatePurchaseStatus, (state, { purchaseId, status }) => ({
    ...state,
    purchases: state.purchases.map(purchase =>
      purchase.id === purchaseId ? { ...purchase, status } : purchase
    )
  }))
);

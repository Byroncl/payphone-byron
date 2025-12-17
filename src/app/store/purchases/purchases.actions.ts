import { createAction, props } from '@ngrx/store';
import { Purchase } from '../../models/purchase.model';

export const loadUserPurchases = createAction(
  '[Purchases] Load User Purchases',
  props<{ userId: number }>()
);

export const loadUserPurchasesSuccess = createAction(
  '[Purchases] Load User Purchases Success',
  props<{ purchases: Purchase[] }>()
);

export const loadUserPurchasesFailure = createAction(
  '[Purchases] Load User Purchases Failure',
  props<{ error: string }>()
);

export const loadAllPurchases = createAction('[Purchases] Load All Purchases');

export const loadAllPurchasesSuccess = createAction(
  '[Purchases] Load All Purchases Success',
  props<{ purchases: Purchase[] }>()
);

export const loadAllPurchasesFailure = createAction(
  '[Purchases] Load All Purchases Failure',
  props<{ error: string }>()
);

export const createPurchase = createAction(
  '[Purchases] Create Purchase',
  props<{ purchase: Omit<Purchase, 'id' | 'createdAt'> }>()
);

export const createPurchaseSuccess = createAction(
  '[Purchases] Create Purchase Success',
  props<{ purchase: Purchase }>()
);

export const createPurchaseFailure = createAction(
  '[Purchases] Create Purchase Failure',
  props<{ error: string }>()
);

export const updatePurchaseStatus = createAction(
  '[Purchases] Update Purchase Status',
  props<{ purchaseId: number; status: 'pendiente' | 'aprobado' | 'rechazado' }>()
);

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { DatabaseService } from '../../services/database.service';
import * as PurchasesActions from './purchases.actions';

@Injectable()
export class PurchasesEffects {
  private actions$ = inject(Actions);
  private dbService = inject(DatabaseService);

  loadUserPurchases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PurchasesActions.loadUserPurchases),
      switchMap(({ userId }) => {
        const purchases = this.dbService.getPurchasesByUserId(userId);
        return of(PurchasesActions.loadUserPurchasesSuccess({ purchases }));
      }),
      catchError((error) =>
        of(PurchasesActions.loadUserPurchasesFailure({ error: error.message }))
      )
    )
  );

  loadAllPurchases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PurchasesActions.loadAllPurchases),
      switchMap(() => {
        const purchases = this.dbService.getAllPurchases();
        return of(PurchasesActions.loadAllPurchasesSuccess({ purchases }));
      }),
      catchError((error) =>
        of(PurchasesActions.loadAllPurchasesFailure({ error: error.message }))
      )
    )
  );

  createPurchase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PurchasesActions.createPurchase),
      switchMap(({ purchase }) => {
        const newPurchase = this.dbService.createPurchase(
          purchase.userId,
          purchase.items,
          purchase.total,
          purchase.paymentId
        );

        if (newPurchase) {
          return of(PurchasesActions.createPurchaseSuccess({ purchase: newPurchase }));
        } else {
          return of(PurchasesActions.createPurchaseFailure({ error: 'Error al crear la compra' }));
        }
      }),
      catchError((error) =>
        of(PurchasesActions.createPurchaseFailure({ error: error.message }))
      )
    )
  );

  updatePurchaseStatus$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PurchasesActions.updatePurchaseStatus),
        tap(({ purchaseId, status }) => {
          this.dbService.updatePurchaseStatus(purchaseId, status);
        })
      ),
    { dispatch: false }
  );

}

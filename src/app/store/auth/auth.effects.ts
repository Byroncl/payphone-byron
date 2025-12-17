import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { DatabaseService } from '../../services/database.service';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private dbService = inject(DatabaseService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }) => {
        const user = this.dbService.loginUser(credentials.email, credentials.password);

        if (user) {
          // Guardar en sessionStorage para persistencia
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          return of(AuthActions.loginSuccess({ user }));
        } else {
          return of(AuthActions.loginFailure({ error: 'Credenciales inválidas' }));
        }
      }),
      catchError((error) =>
        of(AuthActions.loginFailure({ error: error.message }))
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user }) => {
          if (user.tipo === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/catalogo']);
          }
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ userData }) => {
        const user = this.dbService.registerUser(userData);

        if (user) {
          // Guardar en sessionStorage
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          return of(AuthActions.registerSuccess({ user }));
        } else {
          return of(AuthActions.registerFailure({ error: 'Error al registrar usuario. El email puede estar en uso.' }));
        }
      }),
      catchError((error) =>
        of(AuthActions.registerFailure({ error: error.message }))
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => {
          this.router.navigate(['/catalogo']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  loadUserFromSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserFromSession),
      map(() => {
        const userJson = sessionStorage.getItem('currentUser');
        if (userJson) {
          const user = JSON.parse(userJson);
          return AuthActions.loadUserFromSessionSuccess({ user });
        } else {
          return AuthActions.logout();
        }
      })
    )
  );

}

import { createAction, props } from '@ngrx/store';
import { User, UserLogin, UserRegister } from '../../models/user.model';

// Login
export const login = createAction(
  '[Auth] Login',
  props<{ credentials: UserLogin }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

// Register
export const register = createAction(
  '[Auth] Register',
  props<{ userData: UserRegister }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: User }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

// Logout
export const logout = createAction('[Auth] Logout');

// Load user from session
export const loadUserFromSession = createAction('[Auth] Load User From Session');

export const loadUserFromSessionSuccess = createAction(
  '[Auth] Load User From Session Success',
  props<{ user: User }>()
);

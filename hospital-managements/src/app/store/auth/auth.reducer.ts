import { createReducer, on } from '@ngrx/store';
import { loginSuccess, loginFailure, logout } from './auth.action';

export interface AuthState {
  user: any | null;
  error: any | null;
}

export const initialState: AuthState = {
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => ({ ...state, user, error: null })),
  on(loginFailure, (state, { error }) => ({ ...state, error })),
  on(logout, state => ({ ...state, user: null, error: null }))
);

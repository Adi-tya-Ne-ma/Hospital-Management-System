import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ userName: string; password: string; userType: 'patient' | 'doctor' }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: any }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());
export const logout = createAction('[Auth] Logout');


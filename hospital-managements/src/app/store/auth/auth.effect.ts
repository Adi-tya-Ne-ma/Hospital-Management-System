import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../service/auth/auth.service';
import { login, loginSuccess, loginFailure } from './auth.action';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(action =>
        this.authService.login(action.userName, action.password, action.userType).pipe(
          map(user => loginSuccess({ user })),
          catchError(error => of(loginFailure({ error: error.message })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ user }) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          alert('Login successful!');
          const dashboard = user.type === 'patient' ? '/patient-dashboard' : '/doctor-dashboard';
          this.router.navigate([dashboard]);
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFailure),
        tap(({ error }) => {
          alert(error || 'Login failed. Please check credentials.');
        })
      ),
    { dispatch: false }
  );
}

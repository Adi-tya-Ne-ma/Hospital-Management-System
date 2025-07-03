import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppointmentService } from '../../service/appointment/appointment.service';
import {
  bookAppointment,
  bookAppointmentSuccess,
  bookAppointmentFailure,
  loadAppointments,
  loadAppointmentsSuccess,
  loadAppointmentsFailure,
} from './appointment.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AppointmentEffects {
  constructor(
    private actions$: Actions,
    private appointmentService: AppointmentService
  ) {}

  loadAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAppointments),
      mergeMap(() =>
        this.appointmentService.getAllAppointments().pipe(
          map((appointments) => loadAppointmentsSuccess({ appointments })),
          catchError((error) => of(loadAppointmentsFailure({ error })))
        )
      )
    )
  );
  bookAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookAppointment),
      mergeMap((action) =>
        this.appointmentService.bookAppointment(action).pipe(
          map((appointment) => bookAppointmentSuccess({ appointment })),
          catchError((error) => of(bookAppointmentFailure({ error })))
        )
      )
    )
  );
}
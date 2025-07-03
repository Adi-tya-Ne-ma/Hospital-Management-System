import { createAction, props } from '@ngrx/store';

export const bookAppointment = createAction('[Appointment] Book Appointment', props<{ appointment: any }>());
export const bookAppointmentSuccess = createAction('[Appointment] Book Appointment Success', props<{ appointment: any }>());
export const bookAppointmentFailure = createAction('[Appointment] Book Appointment Failure', props<{ error: any }>());

export const loadAppointments = createAction('[Appointment] Load Appointments');
export const loadAppointmentsSuccess = createAction('[Appointment] Load Appointments Success', props<{ appointments: any[] }>());
export const loadAppointmentsFailure = createAction('[Appointment] Load Appointments Failure', props<{ error: any }>());

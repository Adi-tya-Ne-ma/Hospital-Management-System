import { createReducer, on } from '@ngrx/store';
import * as AppointmentActions from './appointment.actions';
import { Appointment } from './appointment.model';

export interface AppointmentState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentState = {
  appointments: [],
  loading: false,
  error: null,
};

export const appointmentReducer = createReducer(
  initialState,
  on(AppointmentActions.loadAppointments, state => ({ ...state, loading: true })),
  on(AppointmentActions.loadAppointmentsSuccess, (state, { appointments }) => ({
    ...state,
    loading: false,
    appointments,
  })),
  on(AppointmentActions.loadAppointmentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AppointmentActions.bookAppointment, state => ({ ...state, loading: true })),
  on(AppointmentActions.bookAppointmentSuccess, (state, { appointment }) => ({
    ...state,
    loading: false,
    appointments: [...state.appointments, appointment],
  })),
  on(AppointmentActions.bookAppointmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

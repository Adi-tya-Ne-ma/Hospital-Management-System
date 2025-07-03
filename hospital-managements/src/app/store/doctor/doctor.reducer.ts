// // import { createReducer, on } from '@ngrx/store';
// // import {
// //   loadDoctorSuccess,
// //   loadDoctorFailure,
// //   updateDoctorSuccess,
// //   updateDoctorFailure
// // } from './doctor.actions';

// // export interface DoctorState {
// //   doctor: any | null;
// //   error: any | null;
// // }

// // export const initialState: DoctorState = {
// //   doctor: null,
// //   error: null,
// // };

// // export const doctorReducer = createReducer(
// //   initialState,
// //   on(loadDoctorSuccess, (state, { doctor }) => ({ ...state, doctor, error: null })),
// //   on(loadDoctorFailure, (state, { error }) => ({ ...state, error })),
// //   on(updateDoctorSuccess, (state, { doctor }) => ({ ...state, doctor, error: null })),
// //   on(updateDoctorFailure, (state, { error }) => ({ ...state, error }))
// // );


// import { createReducer, on } from '@ngrx/store';
// import {
//   loadDoctorSuccess,
//   loadDoctorFailure,
//   updateDoctorSuccess,
//   updateDoctorFailure,
//   loadAllDoctorsSuccess,
//   loadAllDoctorsFailure
// } from './doctor.actions';
// import { Doctor } from '../../service/doctor-service/doctor.service';

// export interface DoctorState {
//   doctor: Doctor | null;
//   allDoctors: Doctor[];
//   error: any | null;
//   loading: boolean;
// }

// export const initialState: DoctorState = {
//   doctor: null,
//   allDoctors: [],
//   error: null,
//   loading: false
// };

// export const doctorReducer = createReducer(
//   initialState,
//   on(loadDoctorSuccess, (state, { doctor }) => ({ ...state, doctor, error: null })),
//   on(loadDoctorFailure, (state, { error }) => ({ ...state, error })),
//   on(updateDoctorSuccess, (state, { doctor }) => ({ ...state, doctor, error: null })),
//   on(updateDoctorFailure, (state, { error }) => ({ ...state, error })),
//   on(loadAllDoctorsSuccess, (state, { doctors }) => ({ ...state, allDoctors: doctors, error: null })),
//   on(loadAllDoctorsFailure, (state, { error }) => ({ ...state, error }))
// );
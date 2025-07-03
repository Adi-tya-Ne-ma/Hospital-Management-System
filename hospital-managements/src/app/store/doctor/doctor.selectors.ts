// // doctor.selectors.ts
// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { DoctorState } from './doctor.reducer';

// export const selectDoctorState = createFeatureSelector<DoctorState>('doctor');

// export const selectDoctor = createSelector(
//   selectDoctorState,
//   state => state?.doctor ?? null
// );

// export const selectDoctorError = createSelector(
//   selectDoctorState,
//   state => state?.error ?? null
// );

// export const selectAllDoctors = createSelector(
//   selectDoctorState,
//   state => state?.allDoctors ?? []
// );

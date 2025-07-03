// // import { createAction, props } from '@ngrx/store';

// // export const loadDoctor = createAction('[Doctor] Load Doctor');
// // export const loadDoctorSuccess = createAction('[Doctor] Load Doctor Success', props<{ doctor: any }>());
// // export const loadDoctorFailure = createAction('[Doctor] Load Doctor Failure', props<{ error: any }>());

// // export const updateDoctor = createAction('[Doctor] Update Doctor', props<{ doctor: any }>());
// // export const updateDoctorSuccess = createAction('[Doctor] Update Doctor Success', props<{ doctor: any }>());
// // export const updateDoctorFailure = createAction('[Doctor] Update Doctor Failure', props<{ error: any }>());

// import { createAction, props } from '@ngrx/store';
// import { Doctor } from '../../service/doctor-service/doctor.service';

// export const loadDoctor = createAction('[Doctor] Load Doctor');
// export const loadDoctorSuccess = createAction('[Doctor] Load Doctor Success', props<{ doctor: Doctor }>());
// export const loadDoctorFailure = createAction('[Doctor] Load Doctor Failure', props<{ error: any }>());

// export const updateDoctor = createAction('[Doctor] Update Doctor', props<{ doctor: Partial<Doctor> }>());
// export const updateDoctorSuccess = createAction('[Doctor] Update Doctor Success', props<{ doctor: Doctor }>());
// export const updateDoctorFailure = createAction('[Doctor] Update Doctor Failure', props<{ error: any }>());

// // New actions for doctor listing
// export const loadAllDoctors = createAction('[Doctor] Load All Doctors');
// export const loadAllDoctorsSuccess = createAction('[Doctor] Load All Doctors Success', props<{ doctors: Doctor[] }>());
// export const loadAllDoctorsFailure = createAction('[Doctor] Load All Doctors Failure', props<{ error: any }>());
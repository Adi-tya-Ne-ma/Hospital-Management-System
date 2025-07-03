// // import { Injectable } from '@angular/core';
// // import { Actions, createEffect, ofType } from '@ngrx/effects';
// // import { DoctorService } from '../../service/doctor-service/doctor.service';

// // import {
// //   loadDoctor,
// //   loadDoctorSuccess,
// //   loadDoctorFailure,
// //   updateDoctor,
// //   updateDoctorSuccess,
// //   updateDoctorFailure
// // } from './doctor.actions';
// // import { mergeMap, map, catchError } from 'rxjs/operators';
// // import { of } from 'rxjs';

// // @Injectable()
// // export class DoctorEffects {
// //   constructor(private actions$: Actions, private doctorService: DoctorService) {}

// //   loadDoctor$ = createEffect(() =>
// //     this.actions$.pipe(
// //       ofType(loadDoctor),
// //       mergeMap(() =>
// //         this.doctorService.getDoctorProfile().pipe(
// //           map(doctor => loadDoctorSuccess({ doctor })),
// //           catchError(error => of(loadDoctorFailure({ error })))
// //         )
// //       )
// //     )
// //   );

// //   updateDoctor$ = createEffect(() =>
// //     this.actions$.pipe(
// //       ofType(updateDoctor),
// //       mergeMap(action =>
// //         this.doctorService.updateDoctorProfile(action.doctor).pipe(
// //           map(doctor => updateDoctorSuccess({ doctor })),
// //           catchError(error => of(updateDoctorFailure({ error })))
// //         )
// //       )
// //     )
// //   );
// // }


// import { Injectable } from '@angular/core'; 
// import { Actions, createEffect, ofType } from '@ngrx/effects'; 
// import { DoctorService } from '../../service/doctor-service/doctor.service';  

// import {   
//   loadDoctor,   
//   loadDoctorSuccess,   
//   loadDoctorFailure,   
//   updateDoctor,   
//   updateDoctorSuccess,   
//   updateDoctorFailure,
//   loadAllDoctors,
//   loadAllDoctorsSuccess,
//   loadAllDoctorsFailure
// } from './doctor.actions'; 

// import { mergeMap, map, catchError } from 'rxjs/operators'; 
// import { of } from 'rxjs';  

// @Injectable() 
// export class DoctorEffects {   
//   constructor(private actions$: Actions, private doctorService: DoctorService) {}    

//   loadDoctor$ = createEffect(() =>     
//     this.actions$.pipe(       
//       ofType(loadDoctor),       
//       mergeMap(() =>         
//         this.doctorService.getDoctorProfile().pipe(           
//           map(doctor => loadDoctorSuccess({ doctor })),           
//           catchError(error => of(loadDoctorFailure({ error })))         
//         )       
//       )     
//     )   
//   );    

//   updateDoctor$ = createEffect(() =>     
//     this.actions$.pipe(       
//       ofType(updateDoctor),       
//       mergeMap(action =>         
//         this.doctorService.updateDoctorProfile(action.doctor).pipe(           
//           map(doctor => updateDoctorSuccess({ doctor })),           
//           catchError(error => of(updateDoctorFailure({ error })))         
//         )       
//       )     
//     )   
//   ); 

//   loadAllDoctors$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loadAllDoctors),
//       mergeMap(() =>
//         this.doctorService.getAllDoctors().pipe(
//           map(doctors => loadAllDoctorsSuccess({ doctors })),
//           catchError(error => of(loadAllDoctorsFailure({ error })))
//         )
//       )
//     )
//   );
// }
import { Routes } from '@angular/router';
import { AuthFlowGuard } from './features/auth/guards/auth-flow.guard';
import { AuthGuard } from './gaurds/auth.guard';

export const routes: Routes = [
  {path: 'auth', children: [
    {path: 'sign-in', loadComponent: () => import('./features/auth/sign-in/sign-in.component')
      .then((m) => m.SignInComponent)},
    {path: 'sign-up', loadComponent: () => import('./features/auth/sign-up/sign-up.component')
      .then((m) => m.SignUpComponent)},
    {path: 'doctor', loadComponent: () => import('./features/auth/create-doctor/create-doctor.component')
      .then((m) => m.CreateDoctorComponent),
      canActivate: [AuthFlowGuard]},
    {path: 'clinic', loadComponent: () => import('./features/auth/create-clinic/create-clinic.component')
      .then((m) => m.CreateClinicComponent),
      canActivate: [AuthFlowGuard]}
  ]},
  {path: '',loadComponent: ()=> import('./features/main-layout/main-layout/main-layout.component')
    .then((m) => m.MainLayoutComponent),
    canActivate: [AuthGuard],
    children:[
      {
        path: 'employees',loadComponent: ()=> import('./features/employee/employee.component')
        .then((m) => m.EmployeeComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'work-times',loadComponent: ()=> import('./features/work-time/work-time.component')
        .then((m) => m.WorkTimeComponent),
        canActivate: [AuthGuard]
      }
    ]
  }

];
// export const routes: Routes = [
//   {path: '', redirectTo: 'auth', pathMatch: 'full'},
//   {path: 'auth',
//       loadComponent: () =>
//           import('./layouts/auth-layout/auth-layout.component')
//       .then((m) => m.AuthLayoutComponent),
//   children: [
//       {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
//       {path: 'sign-in', loadComponent: () => import('./pages/auth/sign-in/sign-in.component')
//           .then((m) => m.SignInComponent)},
//       {path: 'sign-up', loadComponent: () => import('./pages/auth/sign-up/sign-up.component')
//           .then((m) => m.SignUpComponent)}
//   ]},
//   {path: 'user',
//       loadComponent: () =>
//           import('./layouts/user-layout/user-layout.component')
//       .then((m) => m.UserlayoutComponent)}
// ];

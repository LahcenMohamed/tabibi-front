import { Routes } from '@angular/router';
import { AuthFlowGuard } from './features/auth/guards/auth-flow.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full', },
  {path: 'auth', children: [
    {path: 'sign-up', loadComponent: () => import('./features/auth/sign-up/sign-up.component')
      .then((m) => m.SignUpComponent)},
    {path: 'doctor', loadComponent: () => import('./features/auth/create-doctor/create-doctor.component')
      .then((m) => m.CreateDoctorComponent),
      canActivate: [AuthFlowGuard]},
    {path: 'clinic', loadComponent: () => import('./features/auth/create-clinic/create-clinic.component')
      .then((m) => m.CreateClinicComponent),
      canActivate: [AuthFlowGuard]}
  ]}

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

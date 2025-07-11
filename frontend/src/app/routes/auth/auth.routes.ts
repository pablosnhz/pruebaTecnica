import { Routes } from '@angular/router';
import { userGuard } from 'src/app/core/guards/user-guard.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
    canActivate: [userGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((c) => c.RegisterComponent),
    canActivate: [userGuard],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

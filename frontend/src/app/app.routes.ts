import { Routes } from '@angular/router';
import { notUserGuard } from './core/guards/not-auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./../app/routes/auth/auth.module').then((a) => a.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [notUserGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((d) => d.DashboardModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

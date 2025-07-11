import { Routes } from '@angular/router';
import { notUserGuard } from './core/guards/not-auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./../app/routes/auth/auth.routes').then((a) => a.AUTH_ROUTES),
  },
  {
    path: 'dashboard',
    canActivate: [notUserGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((d) => d.DASHBOARD_ROUTES),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

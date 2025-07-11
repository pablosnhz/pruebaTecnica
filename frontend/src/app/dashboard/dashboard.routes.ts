import { Routes } from '@angular/router';
import { userGuard } from 'src/app/core/guards/user-guard.guard';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard.component').then((d) => d.DashboardComponent),
    children: [
      {
        path: 'weather',
        loadComponent: () =>
          import('./pages/weather/weather.component').then(
            (w) => w.WeatherComponent
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/users/users.component').then((d) => d.UsersComponent),
      },
      {
        path: '',
        redirectTo: 'weather',
        pathMatch: 'full',
      },
    ],
  },
];

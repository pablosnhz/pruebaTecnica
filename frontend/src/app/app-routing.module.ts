import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { notUserGuard } from './core/guards/not-auth.guard';

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

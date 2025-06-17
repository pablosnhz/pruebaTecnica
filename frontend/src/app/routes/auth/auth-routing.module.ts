import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { userGuard } from 'src/app/core/guards/user-guard.guard';

const routes: Routes = [
  { path: 'login', canActivate: [userGuard], component: LoginComponent },
  { path: 'register', canActivate: [userGuard], component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

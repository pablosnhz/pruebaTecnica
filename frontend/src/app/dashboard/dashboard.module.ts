import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AsideBarComponent } from './dashboard/components/aside-bar/aside-bar.component';
import { DashboardComponent } from './dashboard.component';
import { TopBarComponent } from './dashboard/components/top-bar/top-bar.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { UsersComponent } from './pages/users/users.component';
import { SharedModule } from '../shared/shared.module';
import { TasksComponent } from './pages/tasks/tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AsideBarComponent,
    DashboardComponent,
    TopBarComponent,
    WeatherComponent,
    UsersComponent,
    TasksComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}

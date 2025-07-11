import { Component, signal, Signal } from '@angular/core';
import { AsideBarComponent } from './dashboard/components/aside-bar/aside-bar.component';
import { TopBarComponent } from './dashboard/components/top-bar/top-bar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
  standalone: true,
  imports: [AsideBarComponent, TopBarComponent],
})
export class DashboardComponent {}

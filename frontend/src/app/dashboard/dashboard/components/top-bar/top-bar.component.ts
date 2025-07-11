import { Component, inject, OnInit, Signal } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  private authService = inject(AuthService);

  ngOnInit(): void {}

  logoutButton() {
    this.authService.logout();
  }
}

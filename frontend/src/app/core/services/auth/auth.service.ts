import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  $user: WritableSignal<any> = signal(null);
  $loading: WritableSignal<boolean> = signal(false);
  $loadingForRender: WritableSignal<string> = signal('');

  constructor() {
    this.restoreUser();
  }

  getUsuarios(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/auth/getUsers`);
  }

  login(email: string, password: string) {
    this.$loading.set(true);
    return this.http
      .post(`${environment.apiBaseUrl}/auth/login`, { email, password })
      .pipe(
        tap((response: any) => {
          if (response.user) {
            this.$user.set(response.user);
          }
        }),
        finalize(() => this.$loading.set(false))
      );
  }

  register(user: {
    nameLast: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    this.$loading.set(true);
    return this.http
      .post(`${environment.apiBaseUrl}/auth/register`, user)
      .pipe(finalize(() => this.$loading.set(false)));
  }

  // recuperamos el token para que persista
  restoreUser() {
    const token = sessionStorage.getItem('tokenUser');

    if (token) {
      const user = { token };
      this.$user.set(user);
    }
  }

  logout(): void {
    const userId = this.$user()?.id;
    this.http
      .post(`${environment.apiBaseUrl}/auth/logout`, { id: userId })
      .subscribe({
        next: () => {
          this.$user.set(null);
          sessionStorage.removeItem('tokenUser');
          sessionStorage.removeItem('nameLast');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error al registrar logout', err),
      });
  }
}

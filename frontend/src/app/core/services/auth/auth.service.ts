import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $user: WritableSignal<any> = signal(null);
  $loading: WritableSignal<boolean> = signal(false);

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  getUsuarios(): Observable<any> {
    return this.http.get<any>(`${environment.authApi}/getUsers`);
  }

  login(email: string, password: string) {
    this.$loading.set(true);
    return this.http
      .post(`${environment.authApi}/login`, { email, password })
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
      .post(`${environment.authApi}/register`, user)
      .pipe(finalize(() => this.$loading.set(false)));
  }

  // recuperamos el token para que persista
  restoreUser() {
    const token = sessionStorage.getItem('tokenAlly');

    if (token) {
      const user = { token };
      this.$user.set(user);
    }
  }

  logout(): void {
    const userId = this.$user()?.id;
    this.http.post(`${environment.authApi}/logout`, { id: userId }).subscribe({
      next: () => {
        this.$user.set(null);
        sessionStorage.removeItem('tokenAlly');
        sessionStorage.removeItem('nameLast');
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Error al registrar logout', err),
    });
  }
}

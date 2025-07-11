import { Component, inject, Signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  $loading: Signal<boolean> = this.authService.$loading;
  $loadingForRender: WritableSignal<string> =
    this.authService.$loadingForRender;

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  errorMensaje = '';

  submitLogin(): void {
    if (!this.form.valid) {
      this.errorMensaje = 'Completa todos los campos';
      return;
    }

    const timeRender = setTimeout(() => {
      this.$loadingForRender.set(
        'Los servidores de Render pueden estar iniciando, espere unos segundos...'
      );
    }, 3000);

    const { email, password } = this.form.value;
    this.errorMensaje = '';

    this.authService.login(email, password).subscribe({
      next: (data) => {
        clearTimeout(timeRender);
        this.$loadingForRender.set('');
        sessionStorage.setItem('tokenUser', data.user.token);

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        clearTimeout(timeRender);
        this.$loadingForRender.set('');
        console.error('Error en el login:', error);
        this.errorMensaje = 'Correo o contraseña incorrectos';
      },
    });
  }

  accederComoInvitado() {
    localStorage.setItem('modoInvitado', 'true');
    this.router.navigate(['/dashboard']);
  }
}

import { Component, Signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  $loading: Signal<boolean> = this.authService.$loading;

  form: FormGroup;
  errorMensaje = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitLogin(): void {
    if (!this.form.valid) {
      this.errorMensaje = 'completa todos los campos';
      return;
    }

    const { email, password } = this.form.value;
    this.errorMensaje = '';

    this.authService.login(email, password).subscribe({
      next: () => {
        sessionStorage.setItem('tokenAlly', 'logueado');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
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

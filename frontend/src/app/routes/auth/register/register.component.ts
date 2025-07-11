import { Component, inject, Signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  $loading: Signal<boolean> = this.authService.$loading;

  form: FormGroup = this.fb.group(
    {
      nameLast: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validator: this.validatorPassword }
  );

  errorMessage = '';

  validatorPassword(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  submitRegister() {
    if (
      !this.form.valid ||
      this.form.value.password !== this.form.value.confirmPassword
    ) {
      this.errorMessage =
        'las contraseñas no coinciden o faltan completar campos';
      return;
    }

    const { nameLast, email, password, confirmPassword } = this.form.value;

    this.authService
      .register({ nameLast, email, password, confirmPassword })
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage = 'Email ya registrado o error en el servidor';
          console.error(error);
        },
      });
  }
}

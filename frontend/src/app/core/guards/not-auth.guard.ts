import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const notUserGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const logueado = authService.$user();
  const invitado = localStorage.getItem('modoInvitado') === 'true';

  if (logueado || invitado) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

// import { inject } from '@angular/core';
// import { CanActivateFn } from '@angular/router';
// import { Router } from '@angular/router';
// import { AuthService } from '../services/auth/auth.service';

// export const notUserGuard: CanActivateFn = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   if (authService.$user()) {
//     return true;
//   }

//   return router.createUrlTree(['/login']);
// };

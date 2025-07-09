import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('tokenUser');

  const clonedReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(clonedReq);
};

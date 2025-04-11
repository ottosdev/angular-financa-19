import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast/toast.service';
import { catchError, throwError } from 'rxjs';
import { IErrorDTO } from '../interface/error.dto';
import { AuthService } from '../services/auth/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastService = inject(ToastService);
  const authService = inject(AuthService);
  return next(req).pipe(
    catchError((error: IErrorDTO) => {
      let mensagem = 'Erro inesperado.';

        if (error.status === 400) {
          mensagem = error?.error?.mensagem || 'Erro ao realizar operaçào.';
        }
        if (error.status === 401) {
          mensagem = error?.error?.mensagem || 'Error ao realizar operação';
          router.navigate(['/login']);
        } else if (error.status === 403) {
          mensagem = error?.error?.mensagem || 'Acesso negado.';
        } else if (error.status === 404) {
          mensagem = error?.error?.mensagem || 'Recurso não encontrado.';
        } else if (error.status >= 500) {
          mensagem = error?.error?.mensagem || 'Erro interno no servidor.';
        }

      toastService.error(`Erro ${error.status}`, mensagem);
      return throwError(() => error);
    })
  );
};

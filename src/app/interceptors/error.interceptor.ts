import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast/toast.service';
import { catchError, throwError } from 'rxjs';
import { IErrorDTO } from '../interface/error.dto';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  return next(req).pipe(
    catchError((error: any) => {
      let mensagem = 'Erro inesperado.';
      let errorResponse = error.error;
      console.info(errorResponse);
      if (
        error.status === 400 &&
        typeof errorResponse === 'object' &&
        !Array.isArray(errorResponse)
      ) {
        const mensagens = Object.values(errorResponse).join('\n');
        mensagem = mensagens;
      }
      if (error.status === 401) {
        mensagem = error?.error?.mensagem || 'Error ao realizar operação';
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

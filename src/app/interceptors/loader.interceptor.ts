// src/app/interceptors/loader-interceptor.ts
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoaderService } from '../services/loader/loader.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  if (req.method === 'GET') {
    loaderService.start();
  }

  return next(req).pipe(
    finalize(() => {
      if (req.method === 'GET') {
        loaderService.stop();
      }
    })
  );
};

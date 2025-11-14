import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors, HttpInterceptorFn } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';
import { TransactionService } from './services/transaction.service';

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([retryInterceptor, errorInterceptor])),
    TransactionService,
  ],
};

import { ApplicationConfig, provideZoneChangeDetection  } from '@angular/core';

import { provideRouter, withComponentInputBinding  } from '@angular/router';
import { provideHttpClient, withInterceptors, HttpInterceptorFn } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';


export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  // Here you could add retry logic if needed
  return next(req);
};


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // Here you could add error handling logic
  return next(req);
};


export const appConfig: ApplicationConfig = {
  providers: [
    //provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([retryInterceptor, errorInterceptor]))
  ]
};

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
// other imports...
import { TransactionService } from './services/transaction.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // whatever else you already have (zone detection, http, etc.)
    TransactionService, // <-- add this line
  ],
};

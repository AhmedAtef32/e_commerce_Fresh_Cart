import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { headerInterceptor } from './core/interceptor/header/header.interceptor';
import { provideToastr } from 'ngx-toastr';
import { errorsInterceptor } from './core/interceptor/errors/errors.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideClientHydration(withEventReplay()),
     provideHttpClient(withFetch(), withInterceptors([headerInterceptor,errorsInterceptor])),
     provideAnimations(),
     provideToastr(),
    ]
};

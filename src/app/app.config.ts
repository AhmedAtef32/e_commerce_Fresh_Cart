import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { headerInterceptor } from './core/interceptor/header/header.interceptor';
import { provideToastr } from 'ngx-toastr';
import { errorsInterceptor } from './core/interceptor/errors/errors.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { spinnerInterceptor } from './core/interceptor/spineer/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes , withViewTransitions() ,withHashLocation(),  withInMemoryScrolling({scrollPositionRestoration: 'top'})),
     provideClientHydration(withEventReplay()),
     provideHttpClient(withFetch(), withInterceptors([headerInterceptor,errorsInterceptor,spinnerInterceptor])),
     provideAnimations(),
     provideToastr({
      preventDuplicates: true,
     }),
     importProvidersFrom(NgxSpinnerModule)
    ]
};

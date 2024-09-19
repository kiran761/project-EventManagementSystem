import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // Correct import for HttpClient
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './app/auth.interceptor'; // Assuming you have an AuthInterceptor
import { AuthGuard } from './app/auth.guard'; // Assuming you have an AuthGuard

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Provide HttpClient for making HTTP requests
    { provide: JWT_OPTIONS, useValue: {} }, // Provide an empty object for JWT_OPTIONS
    JwtHelperService, // Provide JwtHelperService correctly for decoding JWT tokens
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // Add the interceptor
    AuthGuard, // Register AuthGuard if needed for route protection
    ...appConfig.providers || [], // Spread appConfig providers, if any exist
    // Other global providers can be added here
  ],
}).catch(err => console.error(err));

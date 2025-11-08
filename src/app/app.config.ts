import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { LandingPage } from './pages/landing-page/landing-page.component';
import { AuthPage } from './pages/auth-page/auth-page.component';
import { VaultPage } from './pages/vault-page/vault-page.component';

const routes: Routes = [
    { path: '', component: LandingPage },
    { path: 'auth', component: AuthPage },
    { path: 'vault', component: VaultPage },
    { path: '**', redirectTo: '' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
};

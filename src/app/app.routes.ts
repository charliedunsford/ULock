import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { AuthPage } from './auth-page/auth-page';
import { VaultPage } from './vault-page/vault-page';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'auth', component: AuthPage },
  { path: 'vault', component: VaultPage },
];

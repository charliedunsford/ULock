import { Routes } from '@angular/router';
import { Landing } from './landing-page/landing-page.component';
import { Auth } from './auth-page/auth-page.component';
import { Vault } from './vault-page/vault-page.component';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'auth', component: Auth },
  { path: 'vault', component: Vault },
];

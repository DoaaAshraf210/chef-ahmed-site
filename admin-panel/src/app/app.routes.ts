import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'admin-login-x7k2', component: Login },
  { path: 'admin-login-x7k2/dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: '**', redirectTo: 'admin-login-x7k2' },
];

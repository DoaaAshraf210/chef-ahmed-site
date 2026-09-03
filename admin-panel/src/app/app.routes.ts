import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { PortfolioTab } from './pages/dashboard/portfolio-tab/portfolio-tab';
import { CakesTab } from './pages/dashboard/cakes-tab/cakes-tab';
import { GateauxTab } from './pages/dashboard/gateaux-tab/gateaux-tab';
import { PricingTab } from './pages/dashboard/pricing-tab/pricing-tab';

export const routes: Routes = [
  { path: 'admin-login-x7k2', component: Login },
  {
    path: 'admin-login-x7k2/dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
      { path: 'portfolio', component: PortfolioTab },
      { path: 'cakes', component: CakesTab },
      { path: 'gateaux', component: GateauxTab },
      { path: 'pricing', component: PricingTab },
    ],
  },
  { path: '**', redirectTo: 'admin-login-x7k2' },
];

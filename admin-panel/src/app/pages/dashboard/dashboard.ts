import { Component, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { PortfolioTab } from './portfolio-tab/portfolio-tab';
import { PricingTab } from './pricing-tab/pricing-tab';
import { GateauxTab } from './gateaux-tab/gateaux-tab';
import { CakesTab } from "./cakes-tab/cakes-tab";
type TabKey = 'portfolio' | 'cakes' | 'gateaux' | 'pricing';

@Component({
  selector: 'app-dashboard',
  imports: [PortfolioTab, PricingTab, GateauxTab, CakesTab],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  activeTab = signal<TabKey>('portfolio');

  constructor(private authService: Auth) {}

  setTab(tab: TabKey) {
    this.activeTab.set(tab);
  }

  logout() {
    this.authService.logout();
  }
}

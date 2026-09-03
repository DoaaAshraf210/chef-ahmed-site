import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
type TabKey = 'portfolio' | 'cakes' | 'gateaux' | 'pricing';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(private authService: Auth) {}

  logout() {
    this.authService.logout();
  }
}

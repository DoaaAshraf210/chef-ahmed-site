import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';
interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private tokenKey = 'chef_ahmed_admin_token';
  isLoggedIn = signal<boolean>(this.hasToken());

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/Auth/login`, { username, password })
      .pipe(
        tap((res) => {
          localStorage.setItem(this.tokenKey, res.token);
          this.isLoggedIn.set(true);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn.set(false);
    this.router.navigate(['/admin-login-x7k2']); 
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}

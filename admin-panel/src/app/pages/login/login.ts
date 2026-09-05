import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  constructor(
    private authService: Auth,
    private router: Router,
  ) {}

  onSubmit() {
    this.errorMessage.set('');
    this.isLoading.set(true);

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/admin-login-x7k2/dashboard']);
      },
      error: () => {
        this.isLoading.set(false);
        this.errorMessage.set('اسم المستخدم أو كلمة المرور غير صحيحة');
      },
    });
  }
}

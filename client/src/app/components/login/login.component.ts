import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 1. Import FormsModule
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-login',
  standalone: true,
  // 2. Add FormsModule to the imports array below
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  validationErrors: any = {};

  constructor(private api: ApiService, private router: Router) {}

  onLogin() {
    // Client-side validation before submission
    if (!this.validateForm()) {
      return; // Validation failed, errors shown in template
    }

    this.api.login(this.credentials).subscribe({
      next: (user: any) => {
        localStorage.setItem('loggedUser', JSON.stringify(user));
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        console.error("Login error:", err);
        let msg = 'Invalid email or password';
        if (err.error && typeof err.error === 'string') {
          msg = err.error;
        }
        alert(msg);
      }
    });
  }

  validateForm(): boolean {
    this.validationErrors = {};
    let isValid = true;

    // Validate email
    if (!this.credentials.email || !this.credentials.email.trim()) {
      this.validationErrors['email'] = 'Email is required';
      isValid = false;
    } else if (!this.isValidEmail(this.credentials.email)) {
      this.validationErrors['email'] = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate password
    if (!this.credentials.password) {
      this.validationErrors['password'] = 'Password is required';
      isValid = false;
    }

    return isValid;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
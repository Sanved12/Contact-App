import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // 3 input fields as per specification
  user = { name: '', email: '', password: '' };
  validationErrors: any = {};

  constructor(private api: ApiService, private router: Router) {}

  onRegister() {
    // Client-side validation before submission
    if (!this.validateForm()) {
      return; // Validation failed, errors set in validationErrors
    }

    this.api.register(this.user).subscribe({
      next: () => {
        alert("Registration Successful!");
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error("Registration error:", err);
        let errorMsg = "Registration Failed";
        
        if (err.error) {
          if (typeof err.error === 'string') {
            errorMsg = err.error;
          } else if (err.error.error) {
            errorMsg = err.error.error;
          } else if (err.error.message) {
            errorMsg = err.error.message;
          }
        }
        alert(errorMsg);
      }
    });
  }

  validateForm(): boolean {
    this.validationErrors = {};
    let isValid = true;

    // Validate name
    if (!this.user.name || !this.user.name.trim()) {
      this.validationErrors['name'] = 'Full name is required';
      isValid = false;
    } else if (this.user.name.trim().length < 2) {
      this.validationErrors['name'] = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Validate email
    if (!this.user.email || !this.user.email.trim()) {
      this.validationErrors['email'] = 'Email address is required';
      isValid = false;
    } else if (!this.isValidEmail(this.user.email)) {
      this.validationErrors['email'] = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate password
    if (!this.user.password) {
      this.validationErrors['password'] = 'Password is required';
      isValid = false;
    } else if (this.user.password.length < 4) {
      this.validationErrors['password'] = 'Password must be at least 4 characters';
      isValid = false;
    }

    return isValid;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // ADD THIS METHOD to solve the TS2339 error
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
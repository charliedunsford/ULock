import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPage implements OnInit {
  username = '';
  password = '';
  isSignup = false;
  errorMessage = '';
  validationErrors: string[] = [];

  constructor(private titleService: Title, private router: Router, private authService: AuthService, private route: ActivatedRoute) {
    this.titleService.setTitle('Auth | ULock');
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.isSignup = params['form'] === 'signup';
    });
  }

  validateForm(): boolean {
    this.validationErrors = [];
    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return false;
    }

    if (this.username.length < 6) {
      this.validationErrors.push('Username must be at least 6 characters long');
    }

    if (this.isSignup) {
      if (this.password.length < 8) {
        this.validationErrors.push('Password must be at least 8 characters');
      }
      if (!/[A-Z]/.test(this.password)) {
        this.validationErrors.push('Password must contain at least one uppercase letter');
      }
      if (!/[0-9]/.test(this.password)) {
        this.validationErrors.push('Password must contain at least one number');
      }
      if (!/[!@#$%^&*()_+\-\=\[\]{};':"\\|,.<>\/?]/.test(this.password)) {
        this.validationErrors.push('Password must contain at least one special character');
      }
    }

    return this.validationErrors.length === 0;
  }

  submit() {
    if (!this.validateForm()) return;

    if (this.isSignup) {
      this.authService.signup(this.username, this.password).subscribe({
        next: () => this.router.navigate(['/vault']),
        error: () => this.errorMessage = 'Sign up failed. Username may already be taken.'
      });
    } else {
      this.authService.signin(this.username, this.password).subscribe({
        next: () => this.router.navigate(['/vault']),
        error: () => this.errorMessage = 'Sign in failed. Please check your credentials.'
      });
    }
  }
}

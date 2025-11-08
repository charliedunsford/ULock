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
  password = ''
  isSignup = false;
  errorMessage = ''
  validationErrors: string[] = [];

  constructor(private titleService: Title, private router: Router, private authService: AuthService, private route: ActivatedRoute) {
    this.titleService.setTitle('Auth | ULock');
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.isSignup = params['form'] === 'signup';
    });
  }

  validatePassword(password: string): string[] {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*()_+\-\=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    return errors;
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
      const passwordErrors = this.validatePassword(this.password);
      this.validationErrors.push(...passwordErrors);
    }

    return this.validationErrors.length === 0;
  }


  submit() {
    if (!this.validateForm()) return;

    const auth = this.isSignup
      ? this.authService.signup(this.username, this.password)
      : this.authService.signin(this.username, this.password);

    auth.subscribe({
      next: () => {
        this.router.navigate(['/vault']);
      },
      error: () => {
        this.errorMessage = this.isSignup
          ? 'Sign up failed. Username may already be taken.' 
          : 'Sign in failed. Please check your credentials.';
      }
    });
  }
}

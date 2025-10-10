import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth-page.html',
  styleUrls: ['./auth-page.scss']
})
export class AuthPage {

  constructor(private route: ActivatedRoute, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Auth | ULock');
    this.route.queryParams.subscribe(params => {
      this.formType = params['form'] === 'signup' ? 'signup' : 'signin';
    });
  }

  formType: 'signin' | 'signup' = 'signin';

  signinForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  signupForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('')
  });

  toggleForm(type: 'signin' | 'signup') {
    this.formType = type;
  }

  onSigninSubmit() {
    console.log('Signin', this.signinForm.value);
    this.router.navigate(['/vault'], {
    });
  }

  onSignupSubmit() {
    console.log('Signup', this.signupForm.value);
    this.router.navigate(['/vault'], {
    });
  }
}

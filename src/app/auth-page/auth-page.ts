import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Signin } from "./signin/signin";
import { Signup } from "./signup/signup";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  imports: [Signin, Signup, CommonModule],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.scss'
})
export class AuthPage {
  formType: 'signin' | 'signup' = 'signin';

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.formType = params['form'] === 'signup' ? 'signup' : 'signin';
    });
  }
}

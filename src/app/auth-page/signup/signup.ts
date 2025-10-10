import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {

  constructor(private router: Router) {}

  signupForm = new FormGroup({
    name : new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit() {
    const name = this.signupForm.value.name ?? '';
    const username = this.signupForm.value.username ?? '';
    const password = this.signupForm.value.password ?? '';

    this.router.navigate(['/vault'], {
    });
  }
}

import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.scss'
})
export class Signin {

  constructor(private router: Router) {}

  signinForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit() {
    const username = this.signinForm.value.username ?? '';
    const password = this.signinForm.value.password ?? '';

    this.router.navigate(['/vault'], {
    });
  }
}

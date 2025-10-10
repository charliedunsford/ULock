import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(private router: Router) {}

  goToAuth(formType: 'signin' | 'signup') {
    this.router.navigate(['/auth'], { queryParams: { form: formType } });
  }
}

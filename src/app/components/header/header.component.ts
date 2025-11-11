import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuOpen: boolean = false;

  constructor(private router: Router) { }

  goToLanding() : void {
    this.router.navigate(['/']);
  }

  goToSignIn() : void{
    this.router.navigate(['/auth'], { queryParams: { form: 'signin' } });
  }

  goToSignUp() : void {
    this.router.navigate(['/auth'], { queryParams: { form: 'signup' } });
  }

  toggleMenu() : void {
    this.menuOpen = !this.menuOpen;
  }
}

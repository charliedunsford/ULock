import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-vault-nav',
  standalone: true,
  imports: [],
  templateUrl: './vault-nav.component.html',
  styleUrl: './vault-nav.component.css'
})
export class VaultNavComponent {
  @Input() username?: string;
  @Output() settingsClicked = new EventEmitter<void>();
  @Output() allItemsClicked = new EventEmitter<void>();
  menuOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  settings(): void {
    this.settingsClicked.emit();
    this.menuOpen = false;
  }

  allItems(): void {
    this.allItemsClicked.emit();
    this.menuOpen = false;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}

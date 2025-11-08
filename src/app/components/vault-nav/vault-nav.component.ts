import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vault-nav',
  standalone: true,
  imports: [],
  templateUrl: './vault-nav.component.html',
  styleUrl: './vault-nav.component.css'
})
export class VaultNavComponent {
  @Input() username?: string;

  logout() {}
}

import { Component, EventEmitter, Output } from '@angular/core';
import { VaultItem } from '../../interfaces/vault-item';
import { SortPipe } from '../../pipes/sort.pipe';

@Component({
  selector: 'app-vault-list',
  standalone: true,
  imports: [SortPipe],
  templateUrl: './vault-list.component.html',
  styleUrl: './vault-list.component.css'
})
export class VaultListComponent {
  vaultItems: VaultItem[] = [
    { id: 1, title: 'Google', username: 'user_example', password: "password" },
    { id: 2, title: 'Social Media', username: 'social_user', password: "pass123" },
    { id: 3, title: 'Bank Account', username: 'bank_user', password: "pass123" }
  ];
}

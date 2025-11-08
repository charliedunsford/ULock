import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { VaultItem } from '../../models/vault-item.model';
import { SortPipe } from '../../pipes/sort.pipe';
import { VaultService } from '../../services/vault.service';

@Component({
  selector: 'app-vault-list',
  standalone: true,
  imports: [SortPipe],
  templateUrl: './vault-list.component.html',
  styleUrl: './vault-list.component.css'
})
export class VaultListComponent implements OnInit {
  @Output() itemSelected = new EventEmitter<VaultItem>();
  vaultItems: VaultItem[] = [];
  selectedItem?: VaultItem;

  constructor(private vaultService: VaultService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  private loadItems(): void {
    this.vaultService.getVaultItems().subscribe(items => {
      this.vaultItems = items;
    });
  }

  selectItem(item: VaultItem): void {
    this.selectedItem = item;
    this.itemSelected.emit(item);
  }

  add(): void {
    this.vaultService.addVaultItem({
      title: 'New Item',
      username: '',
      password_encrypted: '',
      url: '',
      notes: '', // not yet implemented in form
      vault_name: '' // not yet implemented in form
    }).subscribe({
      next: (newItem) => {
        this.vaultItems.push(newItem);
        this.selectItem(newItem);
      },
      error: (err) => {
        console.error('Failed to add vault item:', err);
      }
    });
  }

  getInitials(title?: string): string {
    if (!title) return '?';
    const words = title.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    const w = words[0] || '';
    return (w.substring(0, 2)).toUpperCase() || '?';
  }
}
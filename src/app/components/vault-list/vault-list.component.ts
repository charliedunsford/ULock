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
    this.vaultService.readVaultItems().subscribe({
      next: (items) => {
        this.vaultItems = items;
      },
      error: () => {
        this.vaultItems = [];
      }
    });
  }

  selectItem(item: VaultItem): void {
    this.selectedItem = item;
    this.itemSelected.emit(item);
  }

  add(): void {
    const newItem: VaultItem = {
      title: '',
      username: '',
      password_encrypted: '',
      url: ''
    };
    this.vaultItems.push(newItem);
    this.selectItem(newItem);
  }

  updateItem(updatedItem: VaultItem): void {
    const index = this.vaultItems.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      this.vaultItems[index] = updatedItem;
      this.vaultItems = [...this.vaultItems];
      this.selectedItem = updatedItem;
    }
  }

  deleteItem(id: number): void {
    this.vaultItems = this.vaultItems.filter(item => item.id !== id);
    this.selectedItem = undefined;
  }

  getInitials(title?: string): string {
    if (!title) return '?';
    
    const trimmed = title.trim();
    const words = trimmed.split(/\s+/);
    const firstWord = words[0];
    
    if (firstWord && firstWord.length <= 2 && !/^[a-zA-Z0-9]/.test(firstWord)) {
      return firstWord;
    }
    
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    
    return title.substring(0, 2).toUpperCase() || '?';
  }

  getDisplayTitle(title?: string): string {
    if (!title) return '';
    
    const trimmed = title.trim();
    const words = trimmed.split(/\s+/);
    const firstWord = words[0];
    
    if (firstWord && firstWord.length <= 2 && !/^[a-zA-Z0-9]/.test(firstWord)) {
      return words.slice(1).join(' ');
    }
    
    return title;
  }
}
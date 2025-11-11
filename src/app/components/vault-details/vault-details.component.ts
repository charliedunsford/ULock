import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VaultItem } from '../../models/vault-item.model';
import { SimpleChanges } from '@angular/core';
import { VaultService } from '../../services/vault.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vault-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vault-details.component.html',
  styleUrl: './vault-details.component.css'
})
export class VaultDetailsComponent {
  @Input() item?: VaultItem;
  @Output() itemUpdated = new EventEmitter<VaultItem>();
  @Output() itemDeleted = new EventEmitter<number>();
  @Output() backClicked = new EventEmitter<void>();

  vaultDetailForm: VaultItem = {
    title: '',
    username: '',
    password_encrypted: '',
    url: '',
  };

  constructor(private vaultService: VaultService) {}

  goBack(): void {
    this.backClicked.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
   if (changes['item'] && this.item) {
      const previousItem = changes['item'].previousValue;
      const currentItem = changes['item'].currentValue;
      
      if (!previousItem || previousItem.id !== currentItem?.id) {
        this.vaultDetailForm = { ...this.item };
        this.error = '';
        this.success = '';
      }
    }
  }

  error = '';
  success = '';
  messageFading = false;

  update(): void {
    this.error = '';
    this.success = '';

    if (!this.vaultDetailForm.title || !this.vaultDetailForm.username || !this.vaultDetailForm.password_encrypted) {
      this.error = 'Please fill in all required fields.';
      return;
    }

    this.vaultService.updateVaultItem(this.vaultDetailForm).subscribe((item) => {
      this.success = 'Vault item updated successfully!';
      this.messageFading = false;
      this.itemUpdated.emit(item);
      
      setTimeout(() => this.messageFading = true, 2500);
      setTimeout(() => {
        this.success = '';
        this.messageFading = false;
      }, 3000);
    });
  }

  delete(): void {
    if (!this.vaultDetailForm.id) return;
    this.vaultService.deleteVaultItem(this.vaultDetailForm.id).subscribe(() => {
      this.itemDeleted.emit(this.vaultDetailForm.id as number);
    });
  }

  getInitials(title?: string): string {
    if (!title) return '?';

    const words = title.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }

    return title.substring(0, 2).toUpperCase() || '?';
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VaultItem } from '../../models/vault-item.model';
import { SimpleChanges } from '@angular/core';
import { VaultService } from '../../services/vault.service';

@Component({
  selector: 'app-vault-details',
  standalone: true,
  imports: [],
  templateUrl: './vault-details.component.html',
  styleUrl: './vault-details.component.css'
})
export class VaultDetailsComponent {
  @Input() item?: VaultItem;
  @Output() itemUpdated = new EventEmitter<VaultItem>();
  @Output() itemDeleted = new EventEmitter<number>();

  vaultDetailForm: VaultItem = {
    title: '',
    username: '',
    password_encrypted: '',
    url: '',
    notes: '', // not yet implemented in form
    vault_name: '' // not yet implemented in form
  };

  constructor(private vaultService: VaultService) {}

  ngOnChanges(changes: SimpleChanges): void {
   if (changes['item'] && this.item) {
      this.vaultDetailForm = { ...this.item };
    }
  }

  loading = false; // implement a loading state
  error = ''; // implement error display message
  success = ''; // implement success display message

  update(): void {
    this.loading = true;
    this.error = '';
    this.success = '';

    if (!this.vaultDetailForm.title || !this.vaultDetailForm.username || !this.vaultDetailForm.password_encrypted) {
      this.error = 'Please fill in all required fields';
      this.loading = false;
      return;
    }

    this.vaultService.updateVaultItem(this.vaultDetailForm).subscribe({
      next: (result) => {
        this.success = `Vault item updated successfully!`;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to save vault item. Please try again.';
        this.loading = false;
      }
    });

    this.resetForm();
  }

  delete(): void {
    this.loading = true;
    this.error = '';
    this.success = '';

    if (!this.vaultDetailForm.id) return;
    this.vaultService.deleteVaultItem(this.vaultDetailForm.id).subscribe({
      next: (result) => {
        this.success = 'Vault item deleted successfully!';
        this.loading = false;
        this.itemDeleted.emit(this.vaultDetailForm.id as number);
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to delete vault item. Please try again.';
        this.loading = false;
      }
    });

    this.resetForm();
  }

  resetForm(): void {
    this.error = '';
    this.success = '';
  }
}

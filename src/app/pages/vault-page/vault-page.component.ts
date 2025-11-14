import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { VaultNavComponent } from '../../components/vault-nav/vault-nav.component';
import { VaultListComponent } from '../../components/vault-list/vault-list.component';
import { VaultDetailsComponent } from '../../components/vault-details/vault-details.component';
import { VaultSettingsComponent } from '../../components/vault-settings/vault-settings.component';
import { VaultItem } from '../../models/vault-item.model';
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vault-page',
  standalone: true,
  imports: [CommonModule, VaultNavComponent, VaultListComponent, VaultDetailsComponent, VaultSettingsComponent],
  templateUrl: './vault-page.component.html',
  styleUrl: './vault-page.component.css'
})
export class VaultPage implements OnInit {
  @ViewChild(VaultListComponent) vaultList!: VaultListComponent;
  
  settings = false;
  selectedItem?: VaultItem;
  username = '';
  showDetails = false;
  isMobile = window.innerWidth <= 899;

  constructor(private titleService: Title, private authService: AuthService) {
    this.titleService.setTitle('Vault | ULock');
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => this.username = user || '');
    if (localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark-mode');
    window.addEventListener('resize', () => this.isMobile = window.innerWidth <= 899);
  }

  itemSelected(item: VaultItem): void {
    this.selectedItem = item;
    if (this.isMobile) {
      this.showDetails = true;
    }
  }

  backToList(): void {
    this.showDetails = false;
  }

  itemUpdated(item: VaultItem): void {
    this.selectedItem = item;
    if (this.vaultList) {
      this.vaultList.vaultItems = this.vaultList.vaultItems.filter(i => i.id);
      
      const idx = this.vaultList.vaultItems.findIndex(i => i.id === item.id);
      if (idx !== -1) {
        this.vaultList.updateItem(item);
      } else {
        this.vaultList.vaultItems.push(item);
        this.vaultList.vaultItems = [...this.vaultList.vaultItems];
        this.vaultList.selectedItem = item;
      }
    }
  }

  itemDeleted(id: number): void {
    this.selectedItem = undefined;
    this.vaultList?.deleteItem(id);
    if (this.isMobile) this.showDetails = false;
  }

  openSettings(): void {
    this.settings = true;
  }

  closeSettings(): void {
    this.settings = false;
    if (this.isMobile) this.showDetails = false;
  }
}

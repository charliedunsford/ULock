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
export class VaultPage implements OnInit, OnDestroy {
  @ViewChild(VaultListComponent) vaultList!: VaultListComponent;
  
  settings: boolean = false;
  selectedItem?: VaultItem;
  username: string = '';
  showDetails: boolean = false;
  isMobile: boolean = false;

  constructor(private titleService: Title, private authService: AuthService) {
    this.titleService.setTitle('Vault | ULock');
    this.checkMobile();
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => this.username = user || '');

    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      document.body.classList.add('dark-mode');
    }

    window.addEventListener('resize', () => this.checkMobile());
  }

  ngOnDestroy(): void {
    document.body.classList.remove('dark-mode');
    window.removeEventListener('resize', () => this.checkMobile());
  }

  checkMobile(): void {
    this.isMobile = window.innerWidth <= 899;
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
      this.vaultList.updateItem(item);
    }
  }

  itemDeleted(id: number): void {
    this.selectedItem = undefined;
    if (this.vaultList) {
      this.vaultList.deleteItem(id);
    }
    if (this.isMobile) {
      this.showDetails = false;
    }
  }

  openSettings(): void {
    this.settings = true;
  }

  closeSettings(): void {
    this.settings = false;
    if (this.isMobile) {
      this.showDetails = false;
    }
  }
}

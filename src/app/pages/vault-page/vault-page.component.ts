import { Component } from '@angular/core';
import { VaultNavComponent } from '../../components/vault-nav/vault-nav.component';
import { VaultListComponent } from '../../components/vault-list/vault-list.component';
import { VaultDetailsComponent } from '../../components/vault-details/vault-details.component';
import { VaultSettingsComponent } from '../../components/vault-settings/vault-settings.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-vault-page',
  standalone: true,
  imports: [VaultNavComponent, VaultListComponent, VaultDetailsComponent, VaultSettingsComponent],
  templateUrl: './vault-page.component.html',
  styleUrl: './vault-page.component.css'
})
export class VaultPage {
  settings: boolean = false;

  constructor(private titleService: Title) {
    this.titleService.setTitle('Vault | ULock');
  }
}

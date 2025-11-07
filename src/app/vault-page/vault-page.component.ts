import { Component } from '@angular/core';
import { Navigation } from './navbar/navigation';
import { Vault } from "./vault/vault";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-vault-page',
  imports: [Navigation, Vault],
  templateUrl: './vault-page.component.html',
  styleUrls: ['./vault-page.component.scss']
})
export class VaultPage {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Vault | ULock');
  }
}

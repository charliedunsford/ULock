import { Component } from '@angular/core';
import { Navigation } from './navbar/navigation';
import { Vault } from "./vault/vault";

@Component({
  selector: 'app-vault-page',
  imports: [Navigation, Vault],
  templateUrl: './vault-page.html',
  styleUrls: ['./vault-page.scss']
})
export class VaultPage {

}

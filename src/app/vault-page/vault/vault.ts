import { Component } from '@angular/core';
import { VaultItem } from "./vault-item/vault-item";

@Component({
  selector: 'app-vault',
  imports: [VaultItem],
  templateUrl: './vault.html',
  styleUrl: './vault.scss'
})
export class Vault {

}

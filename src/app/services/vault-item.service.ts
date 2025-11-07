import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VaultItem } from '../vault-page/vault/vault-item/vault-item';

@Injectable({
  providedIn: 'root'
})
export class VaultItemService {
  constructor(private http: HttpClient) {}


}
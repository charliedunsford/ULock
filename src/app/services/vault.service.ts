import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, switchMap } from 'rxjs';
import { VaultItem } from '../models/vault-item.model';
import { environment } from '../environment';
import { EncryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class VaultService {
  private apiUrl = `${environment.apiUrl}/vault`;
  
  constructor(private http: HttpClient, private encryptService: EncryptService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createVaultItem(item: VaultItem): Observable<VaultItem> {
    return from(this.encryptItem(item)).pipe(
      switchMap(encryptedItem => 
        this.http.post<VaultItem>(this.apiUrl, encryptedItem, { headers: this.getAuthHeaders() })
      ),
      switchMap(savedItem => from(this.decryptItem(savedItem)))
    );
  }

  readVaultItems(): Observable<VaultItem[]> {
    return this.http.get<VaultItem[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      switchMap(items => from(this.decryptItems(items)))
    );
  }

  updateVaultItem(item: VaultItem): Observable<VaultItem> {
    return from(this.encryptItem(item)).pipe(
      switchMap(encryptedItem => 
        this.http.put<VaultItem>(`${this.apiUrl}/${item.id}`, encryptedItem, { headers: this.getAuthHeaders() })
      ),
      switchMap(updatedItem => from(this.decryptItem(updatedItem)))
    );
  }

  deleteVaultItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  private async encryptItem(item: VaultItem): Promise<VaultItem> {
    return {
      ...item,
      password_encrypted: item.password_encrypted ? await this.encryptService.encrypt(item.password_encrypted) : ''
    };
  }

  private async decryptItem(item: VaultItem): Promise<VaultItem> {
    return {
      ...item,
      password_encrypted: item.password_encrypted ? await this.encryptService.decrypt(item.password_encrypted) : ''
    };
  }

  private async decryptItems(items: VaultItem[]): Promise<VaultItem[]> {
    return Promise.all(items.map(item => this.decryptItem(item)));
  }
}

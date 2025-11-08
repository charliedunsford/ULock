import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, switchMap, map } from 'rxjs';
import { VaultItem } from '../models/vault-item.model';
import { environment } from '../environment';
import { EncryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class VaultService {
  private apiUrl = `${environment.apiUrl}/vault`;
  
  constructor(
    private http: HttpClient,
    private encryptService: EncryptService
  ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getVaultItems(): Observable<VaultItem[]> {
    return this.http.get<VaultItem[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      switchMap(items => from(this.decryptItems(items)))
    );
  }

  getVaultItem(id: number): Observable<VaultItem> {
    return this.http.get<VaultItem>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      switchMap(item => from(this.decryptItem(item)))
    );
  }

  addVaultItem(item: VaultItem): Observable<VaultItem> {
    return from(this.encryptItem(item)).pipe(
      switchMap(encryptedItem => 
        this.http.post<VaultItem>(this.apiUrl, encryptedItem, { headers: this.getAuthHeaders() })
      ),
      switchMap(savedItem => from(this.decryptItem(savedItem)))
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
    if (!this.encryptService.hasKey()) {
      throw new Error('Encryption key not available. Please sign in again.');
    }

    const encryptedPassword = await this.encryptService.encrypt(item.password_encrypted);

    return {
      ...item,
      password_encrypted: encryptedPassword
    };
  }

  private async decryptItem(item: VaultItem): Promise<VaultItem> {
    if (!this.encryptService.hasKey()) {
      throw new Error('Encryption key not available. Please sign in again.');
    }

    try {
      const decryptedPassword = await this.encryptService.decrypt(item.password_encrypted);

      return {
        ...item,
        password_encrypted: decryptedPassword
      };
    } catch (error) {
      console.error('Failed to decrypt vault item:', error);
      return {
        ...item,
        password_encrypted: '[Decryption Failed]'
      };
    }
  }

  private async decryptItems(items: VaultItem[]): Promise<VaultItem[]> {
    return Promise.all(items.map(item => this.decryptItem(item)));
  }
}

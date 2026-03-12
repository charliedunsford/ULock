import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, of, switchMap } from 'rxjs';
import { VaultItem } from '../models/vault-item.model';
import { environment } from '../environment';
import { EncryptService } from './encrypt.service';
import { AuthService } from './auth.service';

const DEMO_STORAGE_KEY = 'demo_vault';

const DEMO_SEED: VaultItem[] = [
  { id: 1, title: '🐙 GitHub', username: 'visitor', password_encrypted: 'MyP@ssw0rd!', url: 'https://github.com' },
  { id: 2, title: 'Gmail', username: 'visitor@gmail.com', password_encrypted: 'Secur3P@ss!', url: 'https://mail.google.com' },
  { id: 3, title: 'Netflix', username: 'visitor', password_encrypted: 'N3tfl1x!Pass', url: 'https://netflix.com' },
  { id: 4, title: 'AWS Console', username: 'visitor', password_encrypted: 'Cl0udP@ss99!', url: 'https://aws.amazon.com' },
  { id: 5, title: 'LinkedIn', username: 'visitor@gmail.com', password_encrypted: 'L1nk3dIn!2024', url: 'https://linkedin.com' },
];

@Injectable({
  providedIn: 'root'
})
export class VaultService {
  private apiUrl = `${environment.apiUrl}/vault`;

  constructor(private http: HttpClient, private encryptService: EncryptService, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  private getDemoItems(): VaultItem[] {
    const stored = localStorage.getItem(DEMO_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(DEMO_SEED));
      return [...DEMO_SEED];
    }
    return JSON.parse(stored);
  }

  private saveDemoItems(items: VaultItem[]): void {
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(items));
  }

  createVaultItem(item: VaultItem): Observable<VaultItem> {
    if (this.authService.isDemoMode()) {
      const items = this.getDemoItems();
      const newItem = { ...item, id: Date.now() };
      items.push(newItem);
      this.saveDemoItems(items);
      return of(newItem);
    }
    return from(this.encryptItem(item)).pipe(
      switchMap(encryptedItem =>
        this.http.post<VaultItem>(this.apiUrl, encryptedItem, { headers: this.getAuthHeaders() })
      ),
      switchMap(savedItem => from(this.decryptItem(savedItem)))
    );
  }

  readVaultItems(): Observable<VaultItem[]> {
    if (this.authService.isDemoMode()) {
      return of(this.getDemoItems());
    }
    return this.http.get<VaultItem[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      switchMap(items => from(this.decryptItems(items)))
    );
  }

  updateVaultItem(item: VaultItem): Observable<VaultItem> {
    if (this.authService.isDemoMode()) {
      const items = this.getDemoItems();
      const idx = items.findIndex(i => i.id === item.id);
      if (idx !== -1) items[idx] = item;
      this.saveDemoItems(items);
      return of(item);
    }
    return from(this.encryptItem(item)).pipe(
      switchMap(encryptedItem =>
        this.http.put<VaultItem>(`${this.apiUrl}/${item.id}`, encryptedItem, { headers: this.getAuthHeaders() })
      ),
      switchMap(updatedItem => from(this.decryptItem(updatedItem)))
    );
  }

  deleteVaultItem(id: number): Observable<void> {
    if (this.authService.isDemoMode()) {
      const items = this.getDemoItems().filter(i => i.id !== id);
      this.saveDemoItems(items);
      return of(undefined);
    }
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

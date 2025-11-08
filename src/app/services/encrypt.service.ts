import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {
  private encryptKey: CryptoKey | null = null;
  private readonly STORAGE_KEY = 'ulock_key_material';
  private readonly EXPIRY_KEY = 'ulock_key_expiry';
  private readonly SESSION_HOURS = 4;
  constructor() {
    this.loadKeyFromStorage();
  }

  async deriveKey(masterPassword: string, salt: string = 'ulock-salt-v1'): Promise<void> {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(masterPassword),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );

    this.encryptKey = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode(salt),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
    await this.saveKeyToStorage();
  }

  private async saveKeyToStorage(): Promise<void> {
    if (!this.encryptKey) return;

    try {
      const exportedKey = await crypto.subtle.exportKey('jwk', this.encryptKey);
      
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(exportedKey));
      
      const expiryTime = Date.now() + (this.SESSION_HOURS * 60 * 60 * 1000);
      sessionStorage.setItem(this.EXPIRY_KEY, expiryTime.toString());
    } catch (error) {
      console.error('Failed to save key to storage:', error);
    }
  }

  private async loadKeyFromStorage(): Promise<void> {
    try {
      const keyData = sessionStorage.getItem(this.STORAGE_KEY);
      const expiryTime = sessionStorage.getItem(this.EXPIRY_KEY);

      if (!keyData || !expiryTime) return;

      if (Date.now() > parseInt(expiryTime)) {
        this.clearKey();
        return;
      }

      const jwk = JSON.parse(keyData);
      this.encryptKey = await crypto.subtle.importKey(
        'jwk',
        jwk,
        { name: 'AES-GCM' },
        true,
        ['encrypt', 'decrypt']
      );
    } catch (error) {
      console.error('Failed to load key from storage:', error);
      this.clearKey();
    }
  }

  async encrypt(plaintext: string): Promise<string> {
    if (!this.encryptKey) {
      throw new Error('Encryption key not initialized. Call deriveKey() first.');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext);
    
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const encryptedBuffer = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      this.encryptKey,
      data
    );

    const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encryptedBuffer), iv.length);
    
    return this.arrayBufferToBase64(combined);
  }


  async decrypt(encryptedData: string): Promise<string> {
    if (!this.encryptKey) {
      throw new Error('Encryption key not initialized. Call deriveKey() first.');
    }

    try {
      const combined = this.base64ToArrayBuffer(encryptedData);
      
      const iv = combined.slice(0, 12);
      const data = combined.slice(12);

      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        this.encryptKey,
        data
      );

      const decoder = new TextDecoder();
      return decoder.decode(decryptedBuffer);
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Failed to decrypt password. Invalid key or corrupted data.');
    }
  }

  clearKey(): void {
    this.encryptKey = null;
    sessionStorage.removeItem(this.STORAGE_KEY);
    sessionStorage.removeItem(this.EXPIRY_KEY);
  }

  hasKey(): boolean {
    return this.encryptKey !== null;
  }

  private arrayBufferToBase64(buffer: Uint8Array): string {
    let binary = '';
    const len = buffer.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(buffer[i]);
    }
    return btoa(binary);
  }

  private base64ToArrayBuffer(base64: string): Uint8Array {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
}

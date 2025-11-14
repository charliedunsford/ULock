import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {
  private secretKey = sessionStorage.getItem('ulock_key') || '';

  deriveKey(password: string): void {
    this.secretKey = password;
    sessionStorage.setItem('ulock_key', this.secretKey);
  }

  encrypt(plaintext: string): string {
    let encrypted = '';
    for (let i = 0; i < plaintext.length; i++) {
      encrypted += (plaintext.charCodeAt(i) ^ this.secretKey.charCodeAt(i % this.secretKey.length)).toString(16).padStart(4, '0');
    }
    return encrypted;
  }

  decrypt(encryptedText: string): string {
    let decrypted = '';
    for (let i = 0; i < encryptedText.length; i += 4) {
      decrypted += String.fromCharCode(parseInt(encryptedText.substring(i, i + 4), 16) ^ this.secretKey.charCodeAt((i / 4) % this.secretKey.length));
    }
    return decrypted;
  }

  clearKey(): void {
    this.secretKey = '';
    sessionStorage.removeItem('ulock_key');
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {
  private secretKey: string = '';

  constructor() {
    this.loadKey();
  }

  deriveKey(password: string): void {
    this.secretKey = password;
    this.saveKey();
  }

  private saveKey(): void {
    sessionStorage.setItem('ulock_key', this.secretKey);
  }

  private loadKey(): void {
    const key = sessionStorage.getItem('ulock_key');
    if (key) {
      this.secretKey = key;
    }
  }

  encrypt(plaintext: string): string {
    let encrypted = '';
    for (let i = 0; i < plaintext.length; i++) {
      const textCode = plaintext.charCodeAt(i);
      const keyCode = this.secretKey.charCodeAt(i % this.secretKey.length);
      const encryptedCode = textCode ^ keyCode;
      
      encrypted += encryptedCode.toString(16).padStart(4, '0');
    }
    
    return encrypted;
  }

  decrypt(encryptedText: string): string {
    let decrypted = '';
    for (let i = 0; i < encryptedText.length; i += 4) {
      const hexChunk = encryptedText.substring(i, i + 4);
      const encryptedCode = parseInt(hexChunk, 16);
      
      const keyCode = this.secretKey.charCodeAt((i / 4) % this.secretKey.length);
      const decryptedCode = encryptedCode ^ keyCode;
      
      decrypted += String.fromCharCode(decryptedCode);
    }
    
    return decrypted;
  }

  clearKey(): void {
    this.secretKey = '';
    sessionStorage.removeItem('ulock_key');
  }
}

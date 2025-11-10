import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { EncryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<string | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private encryptService: EncryptService) { }

  initFromStorage() {
    const token = localStorage.getItem('token');
    const username = this.decodeUsername(token);
    if (username) this.currentUserSubject.next(username);
  }

  private decodeUsername(token: string | null): string | null {
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      if (!payload) return null;
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(atob(base64));
      return decoded.username ?? null;
    } catch (e) {
      return null;
    }
  }

  signup(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, password })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
          this.currentUserSubject.next(username);
          this.encryptService.deriveKey(password);
        })
      );
  }

  signin(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, { username, password })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
          this.currentUserSubject.next(username);
          this.encryptService.deriveKey(password);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.encryptService.clearKey();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

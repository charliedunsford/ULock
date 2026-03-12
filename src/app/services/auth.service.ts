import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { EncryptService } from './encrypt.service';

const DEMO_TOKEN = 'demo.eyJ1c2VybmFtZSI6InZpc2l0b3IifQ==.demo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static readonly DEMO_USER = 'visitor';
  static readonly DEMO_PASS = 'Demo1234!';

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
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.username;
    } catch {
      return null;
    }
  }

  signup(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, password }).pipe(tap((res: any) => this.handleAuth(res.token, username, password)));
  }

  signin(username: string, password: string): Observable<any> {
    if (username === AuthService.DEMO_USER && password === AuthService.DEMO_PASS) {
      this.handleDemoAuth();
      return of({});
    }
    return this.http.post(`${this.apiUrl}/signin`, { username, password }).pipe(tap((res: any) => this.handleAuth(res.token, username, password)));
  }

  private handleDemoAuth(): void {
    localStorage.setItem('token', DEMO_TOKEN);
    localStorage.setItem('demo', 'true');
    this.currentUserSubject.next(AuthService.DEMO_USER);
  }

  private handleAuth(token: string, username: string, password: string): void {
    localStorage.setItem('token', token);
    this.currentUserSubject.next(username);
    this.encryptService.deriveKey(password);
  }

  isDemoMode(): boolean {
    return localStorage.getItem('demo') === 'true';
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('demo');
    localStorage.removeItem('demo_vault');
    localStorage.removeItem('darkMode');
    document.body.classList.remove('dark-mode');
    this.currentUserSubject.next(null);
    this.encryptService.clearKey();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

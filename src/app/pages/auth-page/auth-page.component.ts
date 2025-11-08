import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPage {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Auth | ULock');
  }
}

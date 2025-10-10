import { Component } from '@angular/core';
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-page',
  imports: [Header, Footer],
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.scss']
})
export class LandingPage {
  constructor(private titleService: Title) {
    this.titleService.setTitle('ULock');
  }
}

import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPage {
  constructor(private titleService: Title) {
    this.titleService.setTitle('ULock');
  }
}

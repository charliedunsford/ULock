import { Component } from '@angular/core';
import { Header } from "./header/header";
import { Footer } from "./footer/footer";

@Component({
  selector: 'app-landing-page',
  imports: [Header, Footer],
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.scss']
})
export class LandingPage {

}

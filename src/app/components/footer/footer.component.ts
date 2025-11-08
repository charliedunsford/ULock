import { Component } from '@angular/core';
import { CopyrightDirective } from '../../directives/copyright.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CopyrightDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}

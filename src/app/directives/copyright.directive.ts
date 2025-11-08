import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[copyrightDirective]',
  standalone: true
})
export class CopyrightDirective {

  constructor(private element : ElementRef) {
    const currentYear = new Date().getFullYear();
    const targetElement: HTMLElement = this.element.nativeElement;
    targetElement.innerText = `© ${currentYear} ULock. All rights reserved.`;
   }
}

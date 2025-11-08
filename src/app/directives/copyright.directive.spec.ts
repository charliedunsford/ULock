import { ElementRef } from '@angular/core';
import { CopyrightDirective } from './copyright.directive';

describe('CopyrightDirective', () => {
  it('should create an instance', () => {
    const directive = new CopyrightDirective(new ElementRef(document.createElement('div')));
    expect(directive).toBeTruthy();
  });
});

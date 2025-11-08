import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultNavComponent } from './vault-nav.component';

describe('VaultNavComponent', () => {
  let component: VaultNavComponent;
  let fixture: ComponentFixture<VaultNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VaultNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

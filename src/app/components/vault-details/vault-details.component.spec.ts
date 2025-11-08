import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultDetailsComponent } from './vault-details.component';

describe('VaultDetailsComponent', () => {
  let component: VaultDetailsComponent;
  let fixture: ComponentFixture<VaultDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VaultDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

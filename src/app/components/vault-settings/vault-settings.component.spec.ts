import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultSettingsComponent } from './vault-settings.component';

describe('VaultSettingsComponent', () => {
  let component: VaultSettingsComponent;
  let fixture: ComponentFixture<VaultSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VaultSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

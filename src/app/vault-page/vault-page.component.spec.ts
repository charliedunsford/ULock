import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultPage } from './vault-page.component';

describe('VaultPage', () => {
  let component: VaultPage;
  let fixture: ComponentFixture<VaultPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

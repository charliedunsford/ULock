import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultItem } from './vault-item';

describe('VaultItem', () => {
  let component: VaultItem;
  let fixture: ComponentFixture<VaultItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaultItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

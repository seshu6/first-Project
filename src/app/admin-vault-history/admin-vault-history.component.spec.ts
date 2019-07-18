import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVaultHistoryComponent } from './admin-vault-history.component';

describe('AdminVaultHistoryComponent', () => {
  let component: AdminVaultHistoryComponent;
  let fixture: ComponentFixture<AdminVaultHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVaultHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVaultHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultHistoryComponent } from './vault-history.component';

describe('VaultHistoryComponent', () => {
  let component: VaultHistoryComponent;
  let fixture: ComponentFixture<VaultHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaultHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaultHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

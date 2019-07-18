import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExchangeComponent } from './admin-exchange.component';

describe('AdminExchangeComponent', () => {
  let component: AdminExchangeComponent;
  let fixture: ComponentFixture<AdminExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

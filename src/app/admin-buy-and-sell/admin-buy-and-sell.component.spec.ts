import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBuyAndSellComponent } from './admin-buy-and-sell.component';

describe('AdminBuyAndSellComponent', () => {
  let component: AdminBuyAndSellComponent;
  let fixture: ComponentFixture<AdminBuyAndSellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBuyAndSellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBuyAndSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

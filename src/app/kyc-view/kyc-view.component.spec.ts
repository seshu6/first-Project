import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycViewComponent } from './kyc-view.component';

describe('KycViewComponent', () => {
  let component: KycViewComponent;
  let fixture: ComponentFixture<KycViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

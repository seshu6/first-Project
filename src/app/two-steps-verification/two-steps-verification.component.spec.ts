import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoStepsVerificationComponent } from './two-steps-verification.component';

describe('TwoStepsVerificationComponent', () => {
  let component: TwoStepsVerificationComponent;
  let fixture: ComponentFixture<TwoStepsVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoStepsVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoStepsVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

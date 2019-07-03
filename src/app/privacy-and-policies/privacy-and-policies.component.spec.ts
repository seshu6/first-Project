import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyAndPoliciesComponent } from './privacy-and-policies.component';

describe('PrivacyAndPoliciesComponent', () => {
  let component: PrivacyAndPoliciesComponent;
  let fixture: ComponentFixture<PrivacyAndPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyAndPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyAndPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

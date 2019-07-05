import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTermsServicesComponent } from './api-terms-services.component';

describe('ApiTermsServicesComponent', () => {
  let component: ApiTermsServicesComponent;
  let fixture: ComponentFixture<ApiTermsServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiTermsServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiTermsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

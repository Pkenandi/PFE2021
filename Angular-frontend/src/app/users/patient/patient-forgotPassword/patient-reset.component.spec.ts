import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientResetComponent } from './patient-reset.component';

describe('PatientResetComponent', () => {
  let component: PatientResetComponent;
  let fixture: ComponentFixture<PatientResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientResetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

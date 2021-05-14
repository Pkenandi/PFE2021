import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedResetPasswordComponent } from './med-reset-password.component';

describe('MedResetPasswordComponent', () => {
  let component: MedResetPasswordComponent;
  let fixture: ComponentFixture<MedResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedResetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

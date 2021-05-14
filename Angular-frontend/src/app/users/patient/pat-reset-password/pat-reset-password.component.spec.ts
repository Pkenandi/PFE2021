import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatResetPasswordComponent } from './pat-reset-password.component';

describe('PatResetPasswordComponent', () => {
  let component: PatResetPasswordComponent;
  let fixture: ComponentFixture<PatResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatResetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

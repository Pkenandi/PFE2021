import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedLoginComponent } from './med-login.component';

describe('MedLoginComponent', () => {
  let component: MedLoginComponent;
  let fixture: ComponentFixture<MedLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

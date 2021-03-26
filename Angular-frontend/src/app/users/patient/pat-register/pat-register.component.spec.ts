import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatRegisterComponent } from './pat-register.component';

describe('PatRegisterComponent', () => {
  let component: PatRegisterComponent;
  let fixture: ComponentFixture<PatRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

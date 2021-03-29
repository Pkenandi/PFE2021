import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedProfileComponent } from './med-profile.component';

describe('MedProfileComponent', () => {
  let component: MedProfileComponent;
  let fixture: ComponentFixture<MedProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

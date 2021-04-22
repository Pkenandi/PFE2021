import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMedComponent } from './profile-med.component';

describe('ProfileMedComponent', () => {
  let component: ProfileMedComponent;
  let fixture: ComponentFixture<ProfileMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

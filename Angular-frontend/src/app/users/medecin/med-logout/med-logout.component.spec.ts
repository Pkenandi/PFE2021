import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedLogoutComponent } from './med-logout.component';

describe('MedLogoutComponent', () => {
  let component: MedLogoutComponent;
  let fixture: ComponentFixture<MedLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedLogoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

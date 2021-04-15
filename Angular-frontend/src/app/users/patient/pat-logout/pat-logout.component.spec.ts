import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatLogoutComponent } from './pat-logout.component';

describe('PatLogoutComponent', () => {
  let component: PatLogoutComponent;
  let fixture: ComponentFixture<PatLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatLogoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

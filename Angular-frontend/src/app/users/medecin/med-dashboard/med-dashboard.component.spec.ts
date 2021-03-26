import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedDashboardComponent } from './med-dashboard.component';

describe('MedDashboardComponent', () => {
  let component: MedDashboardComponent;
  let fixture: ComponentFixture<MedDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

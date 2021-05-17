import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListSpecialiteComponent } from './admin-list-specialite.component';

describe('AdminListSpecialiteComponent', () => {
  let component: AdminListSpecialiteComponent;
  let fixture: ComponentFixture<AdminListSpecialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListSpecialiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

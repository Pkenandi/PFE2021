import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListMedecinComponent } from './admin-list-medecin.component';

describe('AdminListMedecinComponent', () => {
  let component: AdminListMedecinComponent;
  let fixture: ComponentFixture<AdminListMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListMedecinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

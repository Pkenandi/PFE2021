import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedNotifComponent } from './med-notif.component';

describe('MedNotifComponent', () => {
  let component: MedNotifComponent;
  let fixture: ComponentFixture<MedNotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedNotifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

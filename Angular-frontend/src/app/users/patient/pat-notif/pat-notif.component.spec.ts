import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatNotifComponent } from './pat-notif.component';

describe('PatNotifComponent', () => {
  let component: PatNotifComponent;
  let fixture: ComponentFixture<PatNotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatNotifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

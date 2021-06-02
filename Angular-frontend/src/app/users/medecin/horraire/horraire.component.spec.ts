import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorraireComponent } from './horraire.component';

describe('HorraireComponent', () => {
  let component: HorraireComponent;
  let fixture: ComponentFixture<HorraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorraireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinResetComponent } from './medecin-reset.component';

describe('MedecinResetComponent', () => {
  let component: MedecinResetComponent;
  let fixture: ComponentFixture<MedecinResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedecinResetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

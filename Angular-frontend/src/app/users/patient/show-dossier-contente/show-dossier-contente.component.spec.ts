import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDossierContenteComponent } from './show-dossier-contente.component';

describe('ShowDossierContenteComponent', () => {
  let component: ShowDossierContenteComponent;
  let fixture: ComponentFixture<ShowDossierContenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDossierContenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDossierContenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

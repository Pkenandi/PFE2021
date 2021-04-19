import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDossierComponent } from './form-dossier.component';

describe('FormDossierComponent', () => {
  let component: FormDossierComponent;
  let fixture: ComponentFixture<FormDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDossierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

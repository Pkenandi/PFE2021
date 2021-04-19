import { DossierMedical } from '../../../Models/DossierMedical/dossier-medical';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/Models/Patient/patient';
import { PatientService } from 'src/app/Services/patient.service';
import { DossierMedicalService } from 'src/app/Services/dossier-medical.service';
import { FormControl, FormGroup} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Tab } from 'src/app/Models/tab';

@Component({
  selector: 'app-dossier-medical',
  templateUrl: './dossier-medical.component.html',
  styleUrls: ['./dossier-medical.component.css']
})
export class DossierMedicalComponent implements OnInit {

  patient: Patient = this.patientService.patient;
  dossier: DossierMedical = null;
  exist: boolean = true;
  Tab: Tab = null;

  dossierForm = new FormGroup({
    numero: new FormControl(''),
    antecedent: new FormControl(''),
  });

  constructor(public patientService: PatientService,
              public dossierService: DossierMedicalService,
              private route: Router) { }

  ngOnInit(): void {

  }


}

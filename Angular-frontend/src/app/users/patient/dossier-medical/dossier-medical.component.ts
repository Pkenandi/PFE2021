import { DossierMedical } from './../../../Models/DossierMedical/dossier-medical';
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
  dossier: DossierMedical = new DossierMedical('', '');
  numero = this.getRandomInt(1000);
  Tab: Tab = null;

  dossierForm = new FormGroup({
    numero: new FormControl(''),
    antecedent: new FormControl(''),
  });

  constructor(public patientService: PatientService,
              public dossierService: DossierMedicalService,
              private route: Router) { }

  ngOnInit(): void {
    this.dossierForm = new FormGroup({
      numero: new FormControl(this.numero),
      // tslint:disable-next-line: quotemark
      antecedent: new FormControl(" Pas d'antecedent ...")
    });
  }

  addDossier(): void
  {
    this.dossier = this.dossierForm.value;

    this.dossierService.addDossier(this.dossier).subscribe(
      response => {
        this.Tab = response;

        // Annexing dossier to patient

        this.dossierService.attachPatient(this.patient.username, this.Tab.id).subscribe(
          result => {
            console.log(' Dossier and Patient linked => ', result);

            // redirecting to user profile
            this.route.navigate([`../../patient/${this.patient.username}`]);
          },
          error => {
            console.log(' Sorry, something want wrong !');
          });
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }

  getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

}

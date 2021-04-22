import { DossierMedical } from './../../../Models/DossierMedical/dossier-medical';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/Services/patientservice/patient.service';

@Component({
  selector: 'app-show-dossier-contente',
  templateUrl: './show-dossier-contente.component.html',
  styleUrls: ['./show-dossier-contente.component.css']
})
export class ShowDossierContenteComponent implements OnInit {

  details: DossierMedical;

  constructor(public patientService: PatientService) { }

  ngOnInit(): void {
  }

  getDossierDetails(): any
  {
    this.patientService.hasDossierMedical(this.patientService.Username)
      .subscribe(
        (results) => {
          this.details = results;
        },
        (errors: HttpErrorResponse) => {
          console.log(errors.message);
        });
  }

}

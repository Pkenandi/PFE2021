import { DossierMedical } from '../../../Models/DossierMedical/dossier-medical';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/Models/Patient/patient';
import { PatientService } from 'src/app/Services/patientservice/patient.service';
import { DossierMedicalService } from 'src/app/Services/dossierService/dossier-medical.service';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { Tab } from 'src/app/Models/tab';
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {MedecinService} from "../../../Services/medecinService/medecin.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-dossier-medical',
  templateUrl: './dossier-medical.component.html',
  styleUrls: ['./dossier-medical.component.css']
})
export class DossierMedicalComponent implements OnInit {

  patient: Patient = JSON.parse(sessionStorage.getItem("patient"))
  dossier: DossierMedical = null;
  numero = this.getRandomInt(1000000);
  exist: boolean = false;
  Tab: Tab = null;

  dossierForm = new FormGroup({
    numero: new FormControl(''),
    antecedent: new FormControl(''),
  });

  constructor(public patientService: PatientService,
              public dossierService: DossierMedicalService,
              public medecinService: MedecinService,
              private route: Router,
              private toast: ToastrService,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(" Dossier - DrAvicenne ")
    this.findWithPatient();

    this.dossierForm = new FormGroup({
      numero: new FormControl(this.numero),
      antecedent: new FormControl(" Pas d'antecedent ")
    });
  }

  findWithPatient(): void {
    this.dossierService.findWithPatient(this.patient.username).subscribe(
      (response) => {
        this.dossier = response;
        if(this.dossier == null){
          this.exist = false
        }else{
          this.exist = true;
        }
      },
      (error) => {
        console.log(" Erreur : " + error.message);
      }
    )
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  createDossier(): void {

    this.dossier = this.dossierForm.value;

    this.dossierService.addDossier(this.dossier).subscribe(
      response => {
        this.Tab = response;

        // Annexing dossier to patient

        this.dossierService.attachPatient(this.patient.username, this.Tab.id).subscribe(
          result => {
            this.toast.success(" Votre dossier à été créer !", "Nouveau dossier");
            this.ngOnInit();

            // redirecting to user profile
            this.route.navigate([`pat/dashboard`]);
          },
          error => {
            this.toast.error("Une erreur est survenu lors de la creation de votre Dossier","" + error.type);
          });
      },
      (error: HttpErrorResponse) => {
        this.toast.error("Une erreur est survenue : " + error.message);
      });
  }

}

import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../../Services/patientservice/patient.service";
import {FormControl, FormGroup} from "@angular/forms";
import {DossierMedicalService} from "../../../Services/dossierService/dossier-medical.service";
import {Router} from "@angular/router";
import {Patient} from "../../../Models/Patient/patient";
import {DossierMedical} from "../../../Models/DossierMedical/dossier-medical";
import {HttpErrorResponse} from "@angular/common/http";
import {Tab} from "../../../Models/tab";

@Component({
  selector: 'app-form-dossier',
  templateUrl: './form-dossier.component.html',
  styleUrls: ['./form-dossier.component.css']
})
export class FormDossierComponent implements OnInit {
//
//   patient: Patient = this.patientService.patient;
//   dossier: DossierMedical = null;
//   exist: boolean = true;
//   numero = this.getRandomInt(1000);
//   Tab: Tab = null;
//
//   dossierForm = new FormGroup({
//     numero: new FormControl(''),
//     antecedent: new FormControl(''),
//   });
//
//   constructor(public patientService: PatientService,
//               public dossierService: DossierMedicalService,
//               private route: Router) { }
//
  ngOnInit(): void {
  }
//
//   addDossier(): void {
//     this.dossier = this.dossierForm.value;
//
//     this.dossierService.addDossier(this.dossier).subscribe(
//       response => {
//         this.Tab = response;
//
//         // Annexing dossier to patient
//
//         this.dossierService.attachPatient(this.patient.username, this.Tab.id).subscribe(
//           result => {
//             console.log(' Dossier and Patient linked => ', result);
//
//             // redirecting to user profile
//             this.route.navigate([`../../patient/${this.patient.username}`]);
//           },
//           error => {
//             console.log(' Sorry, something want wrong !');
//           });
//       },
//       (error: HttpErrorResponse) => {
//         console.log(error.message);
//       });
//   }
//
//   getDossier(id){
//
//   }
//
//   hasDossier(id): boolean{
//     return this.exist = true;
//   }
//
//   getRandomInt(max) {
//     return Math.floor(Math.random() * max);
//   }
//
}

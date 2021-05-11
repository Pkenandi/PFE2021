import { Component, OnInit } from '@angular/core';
import {DossierMedicalService} from "../../../Services/dossierService/dossier-medical.service";
import {Medecin} from "../../../Models/Medecin/medecin";
import {MedecinService} from "../../../Services/medecinService/medecin.service";
import {PatientService} from "../../../Services/patientservice/patient.service";
import {DossierMedical} from "../../../Models/DossierMedical/dossier-medical";
import {RendezVousService} from "../../../Services/rendezvous/rendez-vous.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-list-dossier',
  templateUrl: './list-dossier.component.html',
  styleUrls: ['./list-dossier.component.css']
})
export class ListDossierComponent implements OnInit {

  dossiers: DossierMedical[] = null;
  isEmpty = true;

  constructor(public dossierService: DossierMedicalService,
              public rdvService: RendezVousService,
              public medecinService: MedecinService,
              public patientService: PatientService,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(" Liste dossier - DrAvicenne")
    this.getDossiers();
  }

  getDossiers(): void{
    this.dossierService.findWithMedecin(this.medecinService.Cin)
      .subscribe(
        (dossiers) => {
          this.dossiers = dossiers;
          if(this.dossiers.length == 0){
            this.isEmpty = true;
          }else {
            this.isEmpty = false;
          }
        },
        (error) => {
          console.log(error.message);
        }
      )
  }

}

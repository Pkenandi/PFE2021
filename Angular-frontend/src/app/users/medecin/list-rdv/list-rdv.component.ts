import { Component, OnInit } from '@angular/core';
import {RendezVousService} from "../../../Services/rendezvous/rendez-vous.service";
import {MedecinService} from "../../../Services/medecinService/medecin.service";
import {PatientService} from "../../../Services/patientservice/patient.service";

@Component({
  selector: 'app-list-rdv',
  templateUrl: './list-rdv.component.html',
  styleUrls: ['./list-rdv.component.css']
})
export class ListRdvComponent implements OnInit {

  constructor(public rdvService: RendezVousService,
              public medecinService: MedecinService,
              public patientService: PatientService) { }

  Wait:[] = null;

  ngOnInit(): void {
    this.rdvService.ma_note = 0;
    this.rdvService.mw_note = 0;
    this.rdvService.m_notifications = 0;
  }

  inWait(): void{
    this.rdvService.findWithMedecin("ATTENTE", this.medecinService.medecin.cin)
      .subscribe(
        (response) => {

        }
      )
  }

}

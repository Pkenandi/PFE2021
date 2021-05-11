import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../../Services/patientservice/patient.service";
import {RendezVousService} from "../../../Services/rendezvous/rendez-vous.service";
import {RendezVous} from "../../../Models/RendezVous/rendez-vous";
import {Medecin} from "../../../Models/Medecin/medecin";
import {MedecinService} from "../../../Services/medecinService/medecin.service";
import {Title} from "@angular/platform-browser";
import {Patient} from "../../../Models/Patient/patient";

@Component({
  selector: 'app-list-rendezvous',
  templateUrl: './list-rendezvous.component.html',
  styleUrls: ['./list-rendezvous.component.css']
})
export class ListRendezvousComponent implements OnInit {

  patientInfo: Patient = JSON.parse(sessionStorage.getItem("patient"));

  accepted: [] = null;
  isAccepted: boolean = false

  inWait: [] = null;
  isInWait: boolean = false;

  denied: [] = null;
  isDenied: boolean = false;

  canceled: [] = null;
  isCanceled: boolean = false;e
  message: string;

  constructor(public patientService: PatientService,
              private rdvService: RendezVousService,
              private medecinService: MedecinService,
              private title: Title) { }

   ngOnInit(): void {
     this.title.setTitle(" Liste Rendez-vous - DrAvicenne")
    this.rdvService.p_notifications = 0;
    this.rdvService.pr_note = 0;
    this.rdvService.pw_note = 0;
    this.rdvService.pa_note = 0;

    this.rdvService.m_notifications = 0;
    this.rdvService.ma_note = 0;
    this.rdvService.mw_note = 0;

    this.acceptedRdv();
    this.inWaitRdv();
    this.deniedRdv();
    this.canceledRdv();
  }

  acceptedRdv(): void{
    this.rdvService.findByStatus("ACCEPTER",this.patientInfo.username).subscribe(
      (response) => {
        this.accepted = response;
        this.rdvService.p_notifications += this.accepted.length; // total notifications
        this.rdvService.pa_note = this.accepted.length; // total rdv attente notifications

        if(this.accepted.length == 0){
          this.isAccepted = false;
        }else{
          this.isAccepted = true;
        }
      },
      (error) => {
        this.message = " Error " + error.message;
      }
    )
  }

  inWaitRdv(): void {
    this.rdvService.findByStatus("ATTENTE",this.patientInfo.username).subscribe(
      (response) => {
        this.inWait = response;
        this.rdvService.p_notifications += this.inWait.length;
        this.rdvService.pw_note = this.inWait.length;

        if(this.inWait.length == 0){
          this.isInWait = false;
        }else{
          this.isInWait = true;
        }
      },
      (error) => {
        this.message = " Error " + error.message;
      }
    )
  }

  deniedRdv(): void {
    this.rdvService.findByStatus("REFUSER",this.patientInfo.username).subscribe(
      (response) => {
        this.denied = response;
        this.rdvService.p_notifications += this.denied.length;
        this.rdvService.pr_note = this.denied.length;

        if(this.denied.length == 0){
          this.isDenied = false;
        }else{
          this.isDenied = true;
        }
      },
      (error) => {
        this.message = " Error " + error.message;
      }
    )
  }

  canceledRdv(): void{
    this.rdvService.findByStatus("ANNULER",this.patientInfo.username).subscribe(
      (response) =>{
        this.canceled = response;
        if(this.canceled.length == 0){
          this.isCanceled = false;
        }else{
          this.isCanceled = true;
        }
      }
    )
  }

  // Operations

  cancelRdv(status: string, id_rdv):void{
    this.rdvService.editStatus(status, id_rdv)
      .subscribe(
        () => {
          this.ngOnInit();
        }
      )
  }

  deleteRdv(id_rdv): void{
    this.rdvService.deleteRdv(id_rdv)
      .subscribe(
        () => {
          this.ngOnInit();
        }
      )
  }

}

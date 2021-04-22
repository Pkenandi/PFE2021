import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../../Services/patientservice/patient.service";
import {RendezVousService} from "../../../Services/rendezvous/rendez-vous.service";
import {RendezVous} from "../../../Models/RendezVous/rendez-vous";

@Component({
  selector: 'app-list-rendezvous',
  templateUrl: './list-rendezvous.component.html',
  styleUrls: ['./list-rendezvous.component.css']
})
export class ListRendezvousComponent implements OnInit {

  accepted: [] = null;
  isAccepted: boolean = false
  inWait: [] = null;
  isInWait: boolean = false;
  denied: [] = null;
  isDenied: boolean = false;
  canceled: [] = null;
  isCanceled: boolean = false;
  message: string;

  constructor(public patientService: PatientService, private rdvService: RendezVousService) { }

  username= this.patientService.patient.username;

  public ngOnInit(): void {
    this.acceptedRdv();
    this.inWaitRdv();
    this.deniedRdv();
    this.canceledRdv();
  }

  acceptedRdv(): void{
    this.rdvService.findByStatus("ACCEPTER",this.username).subscribe(
      (response) => {
        this.accepted = response;
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
    this.rdvService.findByStatus("ATTENTE",this.username).subscribe(
      (response) => {
        this.inWait = response;
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
    this.rdvService.findByStatus("REFUSER",this.username).subscribe(
      (response) => {
        this.denied = response;
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
    this.rdvService.findByStatus("CANCEL",this.username).subscribe(
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

}

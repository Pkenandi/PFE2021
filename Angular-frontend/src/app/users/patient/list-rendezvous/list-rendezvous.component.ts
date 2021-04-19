import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../../Services/patient.service";

@Component({
  selector: 'app-list-rendezvous',
  templateUrl: './list-rendezvous.component.html',
  styleUrls: ['./list-rendezvous.component.css']
})
export class ListRendezvousComponent implements OnInit {

  accepted: [] = [];
  inWait: [] = [];
  denied: [] = [];

  constructor(public patientService: PatientService) { }

  //id = this.patientService.patient.Id;

  ngOnInit(): void {
  }

  acceptedRdv(id): void{

  }

  inWaitRdv(id): void {

  }

  deniedRdv(id): void {

  }

}

import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../Services/patientservice/patient.service";
import {MedecinService} from "../../Services/medecinService/medecin.service";
import {UserService} from "../../Services/userService/user.service";
import {Medecin} from "../../Models/Medecin/medecin";
import {Patient} from "../../Models/Patient/patient";

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent implements OnInit {

  medecin: Medecin;
  patient: Patient;

  constructor(
    public patientService: PatientService,
    public medecinService: MedecinService,
    public userService: UserService)
  { }

  ngOnInit(): void {
  }

}

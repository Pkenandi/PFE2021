import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../../Services/patientService/patient.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pat-logout',
  templateUrl: './pat-logout.component.html',
  styleUrls: ['./pat-logout.component.css']
})
export class PatLogoutComponent implements OnInit {

  constructor(private patientService: PatientService,
              private router: Router) { }

  ngOnInit(): void {
    sessionStorage.removeItem("patient");
    sessionStorage.removeItem("medecin");
    sessionStorage.removeItem("medecins");
    localStorage.removeItem("token");
    sessionStorage.removeItem("horraire");

    this.router.navigate(['mon-compte']).then();
  }

}

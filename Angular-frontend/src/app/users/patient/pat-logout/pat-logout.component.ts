import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../../Services/patient.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-pat-logout',
  templateUrl: './pat-logout.component.html',
  styleUrls: ['./pat-logout.component.css']
})
export class PatLogoutComponent implements OnInit {

  constructor(private patientService: PatientService, private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.patientService.LogOut();
    this.toaster.success("Vous êtes deconnectez !");
    this.router.navigate(['mon-compte']);
  }

}

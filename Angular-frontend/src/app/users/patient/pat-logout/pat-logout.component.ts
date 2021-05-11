import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../../Services/patientservice/patient.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

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
    this.router.navigate(['mon-compte']);
  }

  reload(): void {
    setTimeout(
      () => {
        window.location.reload();
      }, 1
    )
  }
}

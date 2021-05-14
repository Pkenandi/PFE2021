import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PatientService} from "../../../Services/patientservice/patient.service";
import {UsernameDto} from "../../../Models/reset/Dto/Username/username-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-patient-reset',
  templateUrl: './patient-reset.component.html',
  styleUrls: ['./patient-reset.component.css']
})
export class PatientResetComponent implements OnInit {

  resetForm = new FormGroup({
    username: new FormControl(''),
  });
  usernameDto: UsernameDto;
  message = "";
  not_found = false;

  constructor(private patientService: PatientService,
              private router: Router) { }

  ngOnInit(): void {
  }

  check(): void {
    this.usernameDto = this.resetForm.value;
    this.patientService.check(this.usernameDto)
      .subscribe(
        (response) => {
          sessionStorage.setItem("response",JSON.stringify(response));
          this.not_found = false;
          this.reload();
          this.router.navigate(['../../../user/patient/reset-password'])
        },
        () => {
          this.not_found = true;
          this.message = " Pas de patient trouver avec ce nom d'utilisateur ! "
        }
      )
  }

  reload(): void{
    setTimeout(
      () => {
        location.reload();
      },1
    )
  }
}


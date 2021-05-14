import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ResetDto} from "../../../Models/reset/Dto/Reset/reset-dto";
import {PatientService} from "../../../Services/patientservice/patient.service";
import {Router} from "@angular/router";
import {Patient} from "../../../Models/Patient/patient";
import {CustomValidationService} from "../../../Services/validations/custom-validation.service";
import {CountdownComponent} from "ngx-countdown";

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-pat-reset-password',
  templateUrl: './pat-reset-password.component.html',
  styleUrls: ['./pat-reset-password.component.css']
})
export class PatResetPasswordComponent implements OnInit {

  reset: ResetDto;
  patientInfo: Patient = JSON.parse(sessionStorage.getItem("response"));
  isReset= false;
  Alert: Alert[] = [{
    type: 'success',
    message: 'This is an success alert',
  }]
  constructor(private patientService: PatientService,
              private router: Router,
              private validation: CustomValidationService) { }

  resetForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      Cpassword: new  FormControl('', [Validators.required])
    },
    {
      validators: this.validation.passwordMatchValidator('password','Cpassword')
    }
);

  ngOnInit(): void {
  }

  Reset(): void {
    this.reset = this.resetForm.value;
    this.patientService.reset(this.reset,this.patientInfo.username)
      .subscribe(
        (response) => {
          this.resetForm.reset({});
          this.isReset = true;
          this.setIntervalTime();
          this.reload();
        },
        () => {
          this.isReset = false;
        }
      )
  }

  setIntervalTime():void {
    setInterval(
      () => {
        this.router.navigate(['../../../pat/login']);
      }, 5000
    )
  }

  reload(): void {
    setTimeout(
      () => {
        location.reload();
      },1
    )
  }
}

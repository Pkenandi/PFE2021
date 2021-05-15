import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidationService} from "../../../Services/validations/custom-validation.service";
import {MedecinService} from "../../../Services/medecinService/medecin.service";
import {Router} from "@angular/router";
import {ResetDto} from "../../../Models/reset/Dto/Reset/reset-dto";
import {Patient} from "../../../Models/Patient/patient";
import {Medecin} from "../../../Models/Medecin/medecin";

@Component({
  selector: 'app-med-reset-password',
  templateUrl: './med-reset-password.component.html',
  styleUrls: ['./med-reset-password.component.css']
})
export class MedResetPasswordComponent implements OnInit {

  resetForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      Cpassword: new  FormControl('', [Validators.required])
    },
    {
      validators: this.validation.passwordMatchValidator('password','Cpassword')
    }
  );

  reset: ResetDto;
  medecinInfo: Medecin = JSON.parse(sessionStorage.getItem("response"));
  isReset= false;

  constructor(private validation: CustomValidationService,
              private medecinService: MedecinService,
              private router: Router) { }

  ngOnInit(): void {
  }

  Reset(): void {
    this.reset = this.resetForm.value;
    this.medecinService.reset(this.reset,this.medecinInfo.cin)
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

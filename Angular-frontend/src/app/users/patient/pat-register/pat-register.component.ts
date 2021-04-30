import { UserService } from '../../../Services/userService/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Patient } from 'src/app/Models/Patient/patient';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidationService } from 'src/app/Services/validations/custom-validation.service';
import {ToastrService} from "ngx-toastr";
import * as $ from "jquery";

@Component({
  selector: 'app-pat-register',
  templateUrl: './pat-register.component.html',
  styleUrls: ['./pat-register.component.css']
})
export class PatRegisterComponent implements OnInit {

  regPatForm = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
    prenom: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
    ville: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
    groupeSang: new FormControl(""),
    phone: new FormControl('', [Validators.required, Validators.minLength(5)]),
    dateNaiss: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,Validators.minLength(6)]),
    cpassword: new FormControl('', [Validators.required])
  },
  {
    validators: this.validation.passwordMatchValidator('password' , 'cpassword')
  });

  patients: Patient[];
  message = '';

  constructor(private service: UserService,
              private _router: Router,
              private validation: CustomValidationService,
              private toast: ToastrService)
              { }

  ngOnInit(): void {
  }

  get regControl(){
    return this.regPatForm.controls;
  }

  registerPatient(): void {

    this.patients = this.regPatForm.value;
    console.log(this.patients);

    this.service.registerPatient(this.regPatForm.value).subscribe(() => {
      console.log(this.patients);
      this.service.isAuthenticated = true;
      this.toast.success("Heureux de vous comptez parmis nous " + this.patients['nom']);
      this.regPatForm.reset({});
      this._router.navigate(['../pat/login']);
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
      // tslint:disable-next-line: quotemark
      this.toast.error("Désoler, une erreur s'est produite lors de la création de votre compte ! ");
    });
  }

}

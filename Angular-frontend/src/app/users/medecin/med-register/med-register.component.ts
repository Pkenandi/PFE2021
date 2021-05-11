import { UserService } from '../../../Services/userService/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/Models/User/user';
import { Medecin } from 'src/app/Models/Medecin/medecin';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidationService } from 'src/app/Services/validations/custom-validation.service';
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-med-register',
  templateUrl: './med-register.component.html',
  styleUrls: ['./med-register.component.css']
})
export class MedRegisterComponent implements OnInit {

  regMedForm = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
    prenom: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
    specialite: new FormControl('', [Validators.required]),
    ville: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(5)]),
    cin: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
    password: new FormControl('', [Validators.required]),
    cpassword: new FormControl('', [Validators.required])
  },
  {
    validators: this._validator.passwordMatchValidator('password' , 'cpassword')
  });

  medecins: Medecin[];

  constructor(
    private service: UserService,
    private _router: Router,
    private _validator: CustomValidationService,
    private toast: ToastrService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(" Register - DrAvicenne ")
  }

  get regValue(){
    return this.regMedForm.controls;
  }
  // tslint:disable-next-line: typedef
  registerMedecin() {
    this.medecins = this.regMedForm.value;
    console.log('Medecin :', this.medecins);
    this.service.registerMedecin(this.regMedForm.value).subscribe(() => {
      this.service.isAuthenticated = true;
      this.regMedForm.reset({});
      this.toast.info("Bienvenue dans la grande famille Dr ","Bienvenue !");
      this._router.navigate(['../med/login']);
    }, (error: HttpErrorResponse) => {
      console.log(error.message);
    });
  }

}

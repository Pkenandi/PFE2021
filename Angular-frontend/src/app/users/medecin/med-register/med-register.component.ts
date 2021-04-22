import { UserService } from '../../../Services/userService/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/Models/User/user';
import { Medecin } from 'src/app/Models/Medecin/medecin';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidationService } from 'src/app/Services/validations/custom-validation.service';

@Component({
  selector: 'app-med-register',
  templateUrl: './med-register.component.html',
  styleUrls: ['./med-register.component.css']
})
export class MedRegisterComponent implements OnInit {

  regMedForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    specialite: new FormControl('', [Validators.required]),
    ville: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    cin: new FormControl('', [Validators.required]),
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
    private _validator: CustomValidationService ) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  registerMedecin()
  {
    this.medecins = this.regMedForm.value;
    console.log('Medecin :', this.medecins);
    this.service.registerMedecin(this.regMedForm.value).subscribe(() => {
      this.service.isAuthenticated = true;
      this.regMedForm.reset({});
      this._router.navigate(['../med/login']);
    }, (error: HttpErrorResponse) => {
      console.log(error.message);
    });
  }

}

import { UserService } from './../../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Patient } from 'src/app/Models/Patient/patient';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pat-register',
  templateUrl: './pat-register.component.html',
  styleUrls: ['./pat-register.component.css']
})
export class PatRegisterComponent implements OnInit {

  regPatForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    ville: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    groupeSang: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    dateNaiss: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    cpassword: new FormControl('', [Validators.required])
  });

  patients: Patient[];
  message = '';

  constructor(private service: UserService, private _router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  registerPatient()
  {

    this.patients = this.regPatForm.value;
    console.log(this.patients);

    this.service.registerPatient(this.regPatForm.value).subscribe(() => {
      console.log(this.patients);
      this.service.isAuthenticated = true;
      this.regPatForm.reset({});
      this._router.navigate(['../pat/dashboard']);
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
      this.message = 'Un patient existe deja avec ces informations ...';
    });
  }

}

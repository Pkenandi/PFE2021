import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/Models/Patient/patient';
import { PatientService } from 'src/app/Services/patient.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-pat-login',
  templateUrl: './pat-login.component.html',
  styleUrls: ['./pat-login.component.css']
})
export class PatLoginComponent implements OnInit {

  logData: any;
  message = '';
  patient: Patient;


  patLogForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private userService: UserService,
    private patientService: PatientService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  login(): void
  {
    this.logData = this.patLogForm.value;
    console.log(this.logData);
    this.patientService.Login(this.logData.username, this.logData.password)
      .subscribe(response => {
        this.patient = response;
        this.patientService.patient = response;
        this.patLogForm.reset({});
        this.userService.Username = this.patient.nom;
        this.patientService.Username = this.patient.username;
        this.patientService.name = this.patient.nom;
        this.patientService.lastName = this.patient.prenom;
        this.userService.setIsAuthenticated(true);
        sessionStorage.setItem('name', this.patient.nom);
        this.patientService.log = true;
        this._router.navigate(['../pat/dashboard']);
      },
      (error: HttpErrorResponse) => {
        this.message = 'User not found !';
        this.patLogForm.reset({});
      });
  }

  logOut(): void{
    this.patientService.log = false;
  }


  get Username(): any
  { return this.patLogForm.get('username'); }

}

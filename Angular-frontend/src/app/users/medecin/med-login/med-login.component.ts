import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as medecin from 'src/app/Models/Medecin/medecin';
import { UserService } from 'src/app/Services/user.service';
import { MedecinService } from 'src/app/Services/medecin.service';

@Component({
  selector: 'app-med-login',
  templateUrl: './med-login.component.html',
  styleUrls: ['./med-login.component.css']
})
export class MedLoginComponent implements OnInit {

  logData: any;
  Data: any;
  message = '';
  medecin: medecin.Medecin;

  medLogForm = new FormGroup({
    cin: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
    });

  constructor(private service: UserService, private medService: MedecinService, private _router: Router) { }

  ngOnInit(): void {

  }

  login(): void
  {
    this.logData = this.medLogForm.value;
    console.log(this.logData);
    this.service.loginMedecin(this.logData.cin, this.logData.password)
        .subscribe(
          response => {
            console.log(response);
            this.medecin = response;
            this.medLogForm.reset({});
            this.service.Username = this.medecin.nom;
            this.service.setIsAuthenticated(true);
            sessionStorage.setItem('name',this.medecin.nom);
            this.medService.log = true;
            this._router.navigate(['../med/dashboard']);
          },
          error => {
            this.message = ' User not found';
            this.medLogForm.reset({});
          })
  }

}

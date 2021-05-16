import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as medecin from 'src/app/Models/Medecin/medecin';
import { UserService } from 'src/app/Services/userService/user.service';
import { MedecinService } from 'src/app/Services/medecinService/medecin.service';
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import {Medecin} from "src/app/Models/Medecin/medecin";

@Component({
  selector: 'app-med-login',
  templateUrl: './med-login.component.html',
  styleUrls: ['./med-login.component.css']
})
export class MedLoginComponent implements OnInit {

  logData: any;
  Data: any;
  message = '';
  medecin: Medecin;

  medLogForm = new FormGroup({
    cin: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
    });

  constructor(
    private service: UserService,
    private medService: MedecinService,
    private _router: Router,
    private toast: ToastrService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(" Login - DrAvicenne ");
    this.medLogForm.reset({});
  }

  login(): void {
    this.logData = this.medLogForm.value;
    this.service.loginMedecin(this.logData.cin, this.logData.password)
        .subscribe(
          response => {
            this.medecin = response;
            this.medLogForm.reset({});
            this.medService.Cin = this.medecin.cin;
            this.medService.ville = this.medecin.ville;
            this.service.Username = this.medecin.nom;
            this.medService.nom = this.medecin.nom;
            this.service.setIsAuthenticated(true);
            this.medService.medecin = this.medecin;
            this.medService.log = true;
            this.service.isLoggedIn = true;
            sessionStorage.setItem("medecin", JSON.stringify(this.medecin));
            this._router.navigate(['../med/dashboard']);
          },
          error => {
            this.message = ' User not found';
            this.medLogForm.reset({});
          })
  }

  logOut(): void {
    this.medService.log = false;
    this.service.isLoggedIn = false;
  }
}

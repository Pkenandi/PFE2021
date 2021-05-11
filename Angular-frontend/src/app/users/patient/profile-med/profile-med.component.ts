import { Component, OnInit } from '@angular/core';
import {MedecinService} from "../../../Services/medecinService/medecin.service";
import {PatientService} from "../../../Services/patientservice/patient.service";
import {UserService} from "../../../Services/userService/user.service";
import {Subscription} from "rxjs";
import {Medecin} from "../../../Models/Medecin/medecin";
import {FormControl, FormGroup} from "@angular/forms";
import {map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-med',
  templateUrl: './profile-med.component.html',
  styleUrls: ['./profile-med.component.css']
})
export class ProfileMedComponent implements OnInit {

  cin: string = null;
  private sub: Subscription;
  medecin: Medecin = null;
  date = new Date();

  medecinInfo = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    cin: new FormControl(''),
    specialite: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
    ville: new FormControl(''),
  })

  constructor(
    public medecinService: MedecinService,
    public patientService: PatientService,
    public userService: UserService,
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle(" Profile medecin - DrAvicenne")
    this.sub = this.activatedRoute.params.subscribe(
      params => {
        this.cin = params['cin'];

        this.medecinService.getMedecinByCin(this.cin).pipe(
          map(
            (medecin: Medecin) => this.medecin = medecin)
        ).subscribe(
          result => {
            this.medecin = result;
            this.medecinService.medecin = this.medecin;

            this.medecinInfo = new FormGroup({
              nom: new FormControl(result['nom']),
              prenom: new FormControl(result['prenom']),
              cin: new FormControl(result['cin']),
              specialite: new FormControl(result['specialite']),
              email: new FormControl(result['email']),
              phone: new FormControl(result['phone']),
              password: new FormControl(result['password']),
              ville: new FormControl(result['ville']),
            })
          }
        );
      }
    );
  }

  reload(): void {
    setTimeout(
      () => {
        location.reload();
      }, 5
    )
  }
}

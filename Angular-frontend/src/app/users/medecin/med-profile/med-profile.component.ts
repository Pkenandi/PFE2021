import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Medecin } from 'src/app/Models/Medecin/medecin';
import { MedecinService } from 'src/app/Services/medecinService/medecin.service';
import {FormControl, FormGroup} from "@angular/forms";
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-med-profile',
  templateUrl: './med-profile.component.html',
  styleUrls: ['./med-profile.component.css']
})
export class MedProfileComponent implements OnInit, OnDestroy{

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
    public medService: MedecinService,
    public activatedRoute: ActivatedRoute,
    private toaster: ToastrService
    ) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(
      params => {
        this.cin = params['cin'];

        this.medService.getMedecinByCin(this.cin).pipe(
          map(
            (medecin: Medecin) => this.medecin = medecin)
        ).subscribe(
          result => {
            this.medecin = result;
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateMedecin(): void {
    this.medecin = this.medecinInfo.value;

    this.medService.update(this.medecin, this.activatedRoute.snapshot.params.cin)
      .subscribe(
        result => {
          this.medecin = result;
          this.toaster.success(
            "Vos informations ont étaient modifiées le \n"
            + this.date.getDate()
            + "-" + this.date.getMonth()
            + "-" + this.date.getFullYear(),
            "Modification");
        },
        error => {
          this.toaster.error("Désoler, impossible de modifier vos informations !!", "Echec de modification");
        }
      )
  }

}

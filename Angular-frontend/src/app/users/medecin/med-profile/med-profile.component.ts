import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Medecin} from 'src/app/Models/Medecin/medecin';
import {MedecinService} from 'src/app/Services/medecinService/medecin.service';
import {FormControl, FormGroup} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {SpecialiteService} from "../../../Services/specialiteService/specialite.service";
import {Specialite} from "../../../Models/spacialite/specialite";

@Component({
  selector: 'app-med-profile',
  templateUrl: './med-profile.component.html',
  styleUrls: ['./med-profile.component.css']
})
export class MedProfileComponent implements OnInit, OnDestroy {

  cin: string = null;
  private sub: Subscription;
  medecin: Medecin = null;
  specialite: Specialite[];
  med = JSON.parse(sessionStorage.getItem("medecin"));
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
    private specialiteService: SpecialiteService,
    public activatedRoute: ActivatedRoute,
    private toaster: ToastrService,
    private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle(" Profile - DrAvicenne ")
    this.sub = this.activatedRoute.params.subscribe(
      params => {
        this.cin = params['cin'];

        this.medService.getMedecinByCin(this.cin).pipe(
          map((medecin: Medecin) => this.medecin = medecin))
          .subscribe(
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

        // get all specialities
        this.specialiteService.getWithMedecin(this.med.id)
          .subscribe(
            (specialities) =>{
              this.specialite = specialities;
            },
            (error) => {
              console.log(error);
            }
          )
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
          sessionStorage.removeItem("medecin");
          sessionStorage.setItem("medecin", JSON.stringify(result));
          this.medecin = JSON.parse(sessionStorage.getItem("medecin"));

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

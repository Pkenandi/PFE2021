import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Specialite} from "../../../Models/spacialite/specialite";
import {Title} from "@angular/platform-browser";
import {SpecialiteService} from "../../../Services/specialiteService/specialite.service";
import {Medecin} from "../../../Models/Medecin/medecin";

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrls: ['./specialite.component.css']
})
export class SpecialiteComponent implements OnInit {

  specialiteForm = new FormGroup({
    specialite: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  added = false;
  specialite:Specialite = null;
  medecinInfo: Medecin = JSON.parse(sessionStorage.getItem("medecin"));

  constructor(private title: Title,
              private specialiteService: SpecialiteService) { }

  ngOnInit(): void {
    this.title.setTitle(" Specialite - DrAvicenne ")
  }

  add(): void{
    this.specialite = this.specialiteForm.value;
    // creation de la speciality
    this.specialiteService.add(this.specialite)
      .subscribe(
        (specialite) => {
          this.specialite = specialite;

          //link with medecin
          this.specialiteService.addMedecin(this.specialite.id, this.medecinInfo.cin)
            .subscribe(
              (response) => {
                  this.specialiteForm.reset({});
                  this.added = true;
                  this.setInterval();

              }
            )
        }
      )
  }

  setInterval(): void {
    setInterval(
      () => {
        this.added = false;
      }, 5000
    )
  }
}

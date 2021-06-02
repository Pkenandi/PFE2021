import {Component, OnInit} from '@angular/core';
import {Horraire} from "../../../Models/horraire/horraire";
import {FormControl, FormGroup} from "@angular/forms";
import {HorraireService} from "../../../Services/horraireService/horraire.service";
import {Medecin} from "../../../Models/Medecin/medecin";
import {HttpErrorResponse} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-horraire',
  templateUrl: './horraire.component.html',
  styleUrls: ['./horraire.component.css']
})
export class HorraireComponent implements OnInit {

  horraires: Horraire[] = [];
  horraire: Horraire;
  medecinInfo: Medecin = JSON.parse(sessionStorage.getItem("medecin"));
  message = '';
  err = false;

  horraireForm = new FormGroup({
    jour: new FormControl(''),
    heure_debut: new FormControl(''),
    heure_fin: new FormControl('')
  });

  editForm = new FormGroup({
    jour: new FormControl(''),
    heure_debut: new FormControl(''),
    heure_fin: new FormControl('')
  });

  constructor(private horraireService: HorraireService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  save(): void {
    this.horraire = this.horraireForm.value;
    if (this.horraire.heure_fin <= this.horraire.heure_debut) {
      this.message = " Intervalle d'heure invalide "
      this.err = true;
      this.setIntervalTime();
    } else {
      this.horraireService.save(this.horraire, this.medecinInfo.cin)
        .subscribe(
          (horraires) => {
            this.ngOnInit();
          },
          (error: HttpErrorResponse) => {
            this.message = " Ce <jour> de la semaine est deja pris dans votre horraire";
            this.err = true;
            this.setIntervalTime();
          }
        )
    }
  }

  getAll(): void {
    this.horraireService.get(this.medecinInfo.id)
      .subscribe(
        (horraires) => {
          this.horraires = horraires;
        }
      )
  }

  getOne(id: number): void {
    this.horraireService.getOne(id)
      .subscribe(
        (horraire) => {
          this.horraire = horraire;
          this.editForm = new FormGroup({
            jour: new FormControl(horraire['jour']),
            heure_debut: new FormControl(horraire['heure_debut']),
            heure_fin: new FormControl(horraire['heure_fin'])
          });
        },
        (err) => {
          console.log(" Erreur ");
        }
      )
  }

  editHorraire(): void{
    this.horraireService.editHorraire(this.editForm.value, this.horraire.id)
      .subscribe(
        (horraire) =>{
          this.ngOnInit();
        },
        (err) => {
          this.message = " Ce <Jour> de la semaine existe deja dans votre emploi du temps";
          this.err = true;
          this.setIntervalTime();
        }
      )
  }

  delete(): void {
    this.horraireService.delete(this.horraire.id)
      .subscribe(
        (result) =>{
          this.ngOnInit();
        },
        (error ) => {
          console.log(" Erreur ");
        }
      )
  }

  openEditModal(edit): void {
    this.modalService.open(edit, { centered: true, size: "sm"})
  }

  setIntervalTime(): void{
    setInterval(
      () => {
        this.err = false;
      }, 5000
    )
  }

}

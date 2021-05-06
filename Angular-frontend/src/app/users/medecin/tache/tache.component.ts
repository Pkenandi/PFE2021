import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Tache} from "../../../Models/tache/tache";
import {TacheService} from "../../../Services/tacheService/tache.service";
import {AgendaService} from "../../../Services/agendaService/agenda.service";
import {MedecinService} from "../../../Services/medecinService/medecin.service";
import {Agenda} from "../../../Models/agenda/agenda";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit {
  taskForm = new FormGroup({
    tache: new FormControl('', [Validators.required]),
    heure: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required])
  })

  tache: Tache = null;
  agenda: Agenda = null;

  constructor(private tacheService: TacheService,
              private agendaService: AgendaService,
              public medecinService: MedecinService,
              private toast: ToastrService) { }

  ngOnInit(): void {
    this.agendaService.get(this.medecinService.medecin.cin)
      .subscribe(
        (response) => {
          this.agenda = response;
        },
        (error) => {
          console.log(" Erreur ", error.message);
        }
      )
  }

  /*createTask() {
    this.tache = this.taskForm.value;
    this.tacheService.create(this.tache)
      .subscribe(
        (response) =>{
          this.tache = response;
          this.toast.success(" Tache créer avec succès !");
          this.agendaService.addTasks(this.agenda.id,this.tache.id)
            .subscribe(
              (rep) => {
                this.toast.success(" Tache ajouter avec succès !");
                this.tacheService.getAll(this.agenda.id)
                  .subscribe(
                    (listTasks) =>{
                      this.tacheService.listTasks = listTasks;
                    },
                    (errors) => {
                      console.log(" erreur ", errors.message);
                    }
                  )
              },
              (error) => {
                this.toast.error(" Erreur lors de l'ajout de la tache !");
              }
            )
        },
        (error) => {
          console.log(" Erreur ", error.message);
          this.toast.error(" Error lors de la creation de la tache !");
        }
      )
  }*/

  sendEvent(){
    this.tacheService.sendEvent();
  }

}

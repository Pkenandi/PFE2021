import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Tache} from "../../../Models/tache/tache";
import {TacheService} from "../../../Services/tacheService/tache.service";
import {AgendaService} from "../../../Services/agendaService/agenda.service";
import {MedecinService} from "../../../Services/medecinService/medecin.service";
import {Agenda} from "../../../Models/agenda/agenda";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import {Medecin} from "../../../Models/Medecin/medecin";

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

  agenda: Agenda = null;
  medecinInfo: Medecin = JSON.parse(sessionStorage.getItem("medecin"));

  constructor(private tacheService: TacheService,
              private agendaService: AgendaService,
              public medecinService: MedecinService,
              private toast: ToastrService,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(" Ajout tache - DrAvicenne");
    this.agendaService.get(this.medecinInfo.cin)
      .subscribe(
        (response) => {
          this.agenda = response;
        },
        (error) => {
          console.log(" Erreur ", error.message);
        }
      )
  }

  sendEvent(){
    this.tacheService.sendEvent();
  }

}

import {
  Component,
  ChangeDetectionStrategy
  , OnInit
} from '@angular/core';
import { Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AgendaService} from "../../../Services/agendaService/agenda.service";
import {MedecinService} from "../../../Services/medecinService/medecin.service";
import {Agenda} from "../../../Models/agenda/agenda";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Medecin} from "../../../Models/Medecin/medecin";
import {ToastrService} from "ngx-toastr";
import {Tache} from "../../../Models/tache/tache";
import {TacheService} from "../../../Services/tacheService/tache.service";
import {MatDialogConfig} from "@angular/material/dialog";
import {TacheComponent} from "../tache/tache.component";

@Component({
  selector: 'app-agenda',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  agendaForm = new FormGroup({
    titre: new FormControl('')
  });

  taskForm = new FormGroup({
    tache: new FormControl('', [Validators.required]),
    heure: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required])
  });

  editForm = new FormGroup({
    titre: new FormControl('')
  });

  tache: Tache = null;
  exist: boolean = false;
  agenda: Agenda = null;
  agendaMed: Agenda;
  medAgenda: Medecin = null;
  listTache: Tache[] = [];
  agendaId: number;
  agendaTitle: string;
  clicked: boolean = false;
  showEditForm: boolean = false;

  constructor(public agendaService: AgendaService,
              public medecinService: MedecinService,
              public tacheService: TacheService,
              public toast: ToastrService,
              public dialog: MatDialog) {  }

  ngOnInit(): void {
    this.check();
  }

  // Methods
  create(): void {
    this.agenda = this.agendaForm.value;
    this.agendaService.create(this.agenda)
      .subscribe(
        (response) => {
          this.agenda = response;
          console.log(this.agenda);

          // Attaching agenda to a medecin
          this.medecinService.attachToAgenda(this.medecinService.medecin.cin,this.agenda.id)
            .subscribe(
              (medecin) => {
                this.medAgenda = medecin;
                this.ngOnInit();
                this.toast.info(" Votre agenda est maintenant disponible !", "Création");
              },
              (errors) => {
                console.log(errors);
              }
            )
        }
      )
  }

  check(): void {
    this.agendaService.get(this.medecinService.medecin.cin)
      .subscribe(
        (response) => {
          this.agendaMed = response;
          console.log("Agenda with Medecin : ", this.agendaMed)
          if (this.agendaMed != null){
            this.exist = true;
            // bind date to edit form
            this.editForm = new FormGroup({
              titre: new FormControl(response['titre'])
            });
            //end
            this.tacheService.getAll(this.agendaMed.id)
              .subscribe(
                (listTache) => {
                  this.listTache = listTache;
                },
                (error) => {
                  console.log(" Erreur: ", error.message)
                }
              )
          }else{
            this.exist = false;
          }
        },
        (error) => {
          console.log(error.message);
        }
      )
  }

  getAgenda(): void {
    this.agendaService.get(this.medecinService.medecin.cin)
      .subscribe(
        (response) =>{
          this.agendaId = response['id'];
          this.agendaTitle = response['titre'];
        },
        (error) =>{
          console.log(" Erreur ");
        }
      )
  }

  edit(): void {
    this.getAgenda();
    this.agenda = this.editForm.value;
    this.agendaService.edit(this.agenda,this.agendaId)
      .subscribe(
        (response) => {
          this.showEditForm = false;
          this.ngOnInit();
        },
        (error) => {
          console.log(" Erreur ", error.message);
        }
      )
  }

  createTask() {
    this.tache = this.taskForm.value;
    this.tacheService.create(this.tache)
      .subscribe(
        (response) =>{
          this.tache = response;
          this.toast.success(" Tache créer avec succès !");
          this.agendaService.addTasks(this.agendaMed.id,this.tache.id)
            .subscribe(
              (rep) => {
                this.toast.success(" Tache ajouter avec succès !");
                this.tacheService.getAll(this.agendaMed.id)
                  .subscribe(
                    (listTasks) =>{
                      this.listTache = null;
                      this.listTache = listTasks;
                      this.ngOnInit();
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
  }

  onClick(): void {
    if(this.clicked == true){
      this.clicked = false;
    }else {
      this.clicked = true;
    }
  }

  showEdit(): void {
    this.showEditForm = this.showEditForm != true;
  }

  hide(): void {
    this.clicked = this.clicked == false;
  }

  Task(): void {
    const config = new MatDialogConfig();
    config.height = "73%";
    config.width = "33%";
    this.dialog.open(TacheComponent,config);
  }
}

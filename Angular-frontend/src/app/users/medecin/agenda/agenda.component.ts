import {
  Component,
  ChangeDetectionStrategy
  , OnInit, Type
} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AgendaService} from "../../../Services/agendaService/agenda.service";
import {MedecinService} from "../../../Services/medecinService/medecin.service";
import {Agenda} from "../../../Models/agenda/agenda";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Medecin} from "../../../Models/Medecin/medecin";
import {ToastrService} from "ngx-toastr";
import {Tache} from "../../../Models/tache/tache";
import {TacheService} from "../../../Services/tacheService/tache.service";
import {ModalDismissReasons, NgbModal, NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DialogService} from "../../../Services/confirm/dialog.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-agenda',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }

    .dark-modal .close {
      color: white;
    }

    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})

export class AgendaComponent implements OnInit {

  agendaForm = new FormGroup({
    titre: new FormControl('')
  });

  taskForm = new FormGroup({
    tache: new FormControl('', [Validators.required]),
    heure: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  editForm = new FormGroup({
    titre: new FormControl('')
  });

  editTaskForm = new FormGroup({
    id: new FormControl(''),
    tache: new FormControl(''),
    description: new FormControl(''),
    date: new FormControl(''),
    heure: new FormControl(''),
  })

  tache: Tache = null;
  exist: boolean = false;
  agenda: Agenda = null;
  agendaMed: Agenda;
  medAgenda: Medecin = null;
  listTache: Tache[] = [];
  clicked: boolean = false;
  showEditForm: boolean = false;
  modal = true;
  medecinInfo: Medecin;
  agendaInfo: Agenda;

  constructor(public agendaService: AgendaService,
              public medecinService: MedecinService,
              public tacheService: TacheService,
              public toast: ToastrService,
              public dialog: MatDialog,
              private modalService: NgbModal,
              public confirmDialog: DialogService,
              private router: Router,
              private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle(" Agenda - DrAvicenne")
    this.medecinInfo = JSON.parse(sessionStorage.getItem("medecin"));
    this.agendaInfo = JSON.parse(sessionStorage.getItem("agenda"));
    this.listTache = JSON.parse(sessionStorage.getItem("listTache"));
    this.asCredentials();
    this.check();
  }

  // Methods
  create(): void {
    this.agenda = this.agendaForm.value;
    this.agendaService.create(this.agenda)
      .subscribe(
        (response) => {
          this.agenda = response;
          // Attaching agenda to a medecin
          this.medecinService.attachToAgenda(this.medecinInfo.cin, this.agenda.id)
            .subscribe(
              () => {
                this.ngOnInit();
                sessionStorage.setItem("agenda", JSON.stringify(this.agenda));
                this.agendaInfo = JSON.parse(sessionStorage.getItem("agenda"));
                this.toast.info(" Votre agenda est maintenant disponible !", "Création");
              },
              (errors) => {
                this.toast.error(" Error lors de la  creation de l'agenda ", errors)
              }
            )
        }
      )
  }

  delete(): void {
    this.medecinService.deleteAgenda(this.medecinInfo.cin, this.agendaInfo.id)
      .subscribe(
        () => {
          sessionStorage.removeItem("agenda");
          sessionStorage.removeItem("listTache");
          this.toast.show(" Agenda deleted !!", 'Suppression');
          this.exist = false;
          this.ngOnInit();
        },
        (errors) => {
          console.log(errors.messages);
        }
      )
  }

  check(): void {
    this.agendaService.get(this.medecinInfo.cin)
      .subscribe(
        (response) => {
          // Storage agenda in session
            sessionStorage.removeItem("agenda");
            sessionStorage.setItem("agenda", JSON.stringify(response))
            this.agendaMed = JSON.parse(sessionStorage.getItem("agenda"));

          if (Object.keys(this.agendaMed).length === 0 || Object.keys(this.agendaMed).length < 0) {
            this.exist = false;
          } else {
            this.tacheService.getAll(this.agendaMed.id)
              .subscribe(
                (listTache) => {
                  sessionStorage.removeItem("listTache");
                  sessionStorage.setItem("listTache", JSON.stringify(listTache));
                  this.listTache = JSON.parse(sessionStorage.getItem("listTache"));
                },
                (error) => {
                  console.log(" Erreur: ", error.message)
                }
              )

            this.editForm = new FormGroup({
              titre: new FormControl(response['titre'])
            });
            //end
            this.exist = true;
          }
        },
        (error) => {
          console.log(error.message);
        }
      )
  }

  edit(): void {
    this.agenda = this.editForm.value;
    this.agendaService.edit(this.agenda, this.agendaInfo.id)
      .subscribe(
        (response) => {
          sessionStorage.setItem("agenda", JSON.stringify(response));
          this.showEditForm = false;
          this.agendaForm.reset({});
          this.ngOnInit();
        },
        (error) => {
          console.log(" Erreur ", error.message);
        }
      )
  }

  showEdit(): void {
    this.showEditForm = this.showEditForm != true;
  }

  hide(): void {
    this.clicked = this.clicked == false;
  }

  asCredentials(): boolean{
    return this.medecinInfo.picture !== null;
  }

  // Tasks Methods

  createTask() {
    this.tache = this.taskForm.value;
    this.tacheService.create(this.tache)
      .subscribe(
        (response) => {
          this.tache = response;
          this.agendaService.addTasks(this.agendaInfo.id, this.tache.id)
            .subscribe(
              (rep) => {
                this.toast.success(" Tache créer avec succès !");
                this.ngOnInit();
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

  editTask(): void {
    this.tache = this.editTaskForm.value;
    this.tacheService.edit(this.tache, this.tache.id)
      .subscribe(
        (response) => {
          this.editTaskForm.reset({});
          this.ngOnInit();
        },
        (error) => {
          this.toast.error(error.message, 'Erreur lors de la modification');
        }
      )
  }

  deleteTask(id: number): void {
    this.tacheService.delete(id)
      .subscribe(
        () => {
          this.toast.warning(" Tache supprimer ", 'suppression');
          this.ngOnInit();
        },
        (error) => {
          this.toast.error(error.message, " Erreur lors de la suppression !!");
        }
      )
  }

  getTaskById(id: number): void {
    this.tacheService.getOne(id)
      .subscribe(
        (response) => {
          this.editTaskForm = new FormGroup({
            id: new FormControl(response['id']),
            tache: new FormControl(response['tache']),
            description: new FormControl(response['description']),
            date: new FormControl(response['date']),
            heure: new FormControl(response["heure"]),
          })
        }
      )
  }

  get sortedArray(): Tache[]{
    return this.listTache.sort(
      (tache_1, tache_2) => {
        return <any>new Date(tache_2.date) - <any>new Date(tache_1.date);
      }
    );
  }

  closeResult = '';

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: "sm"}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${AgendaComponent.getDismissReason(reason)}`;
    });
  }

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, {centered: true, size: "sm"});
  }

  warningAgenda(agenda) {
    this.modalService.open(agenda, { centered: true, size: "sm"})
  }

  warningTask(task) {
    this.modalService.open(task, { centered: true, size: "sm"})
  }

  reload(): void {
    setTimeout(
      () => {
        location.reload();
      }, 1
    )
  }
}

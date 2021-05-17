import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RendezVousService} from "../../../Services/rendezvous/rendez-vous.service";
import {MedecinService} from "../../../Services/medecinService/medecin.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MailComponent} from "../messagerie/mail/mail.component";
import {SmsComponent} from "../messagerie/sms/sms.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";
import {Mail} from "../../../Models/messagerie/mail/mail";
import {PatientService} from "../../../Services/patientservice/patient.service";
import {DossierMedical} from "../../../Models/DossierMedical/dossier-medical";
import {DossierMedicalService} from "../../../Services/dossierService/dossier-medical.service";
import {Title} from "@angular/platform-browser";
import {Medecin} from "../../../Models/Medecin/medecin";
import {MailService} from "../../../Services/mailService/mail.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list-rendez-vous',
  templateUrl: './list-rendez-vous.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list-rendez-vous.component.css'],
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }

    .myCustomModalClass .modal-dialog {
      max-width: 475px;
    }

    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class ListRendezVousComponent implements OnInit {

  constructor(private rendezvousService: RendezVousService,
              public medecinService: MedecinService,
              private patientService: PatientService,
              public dialog: MatDialog,
              private modalService: NgbModal,
              private dossierService: DossierMedicalService,
              private title: Title,
              private mailService: MailService,
              private toast: ToastrService) { }

  mailForm = new FormGroup({
    dest: new FormControl(''),
    from: new FormControl(''),
    topic:new FormControl(''),
    body: new FormControl('')
  })

  smsForm = new FormGroup({
    nom: new FormControl(''),
    numero: new FormControl(''),
    message: new FormControl(''),
  })


  mail: Mail;
  dossierMed: DossierMedical;
  medecinInfo: Medecin = JSON.parse(sessionStorage.getItem("medecin"));

  InWait: [] = null;
  isInWait = false;

  Confirmed: [] = null;
  isConfirmed = false;

  ngOnInit(): void {
    this.title.setTitle(" Liste Rendez-vous - DrAvicenne")
    this.rendezvousService.mw_note = 0;
    this.rendezvousService.ma_note = 0;
    this.rendezvousService.m_notifications = 0;
    this.InWaitRdv();
    this.ConfirmedRdv();
  }

  public InWaitRdv() {
    this.rendezvousService.findWithMedecin("ATTENTE", this.medecinInfo.cin)
      .subscribe(
        (response) => {
          sessionStorage.removeItem("attente");
          sessionStorage.setItem("attente", JSON.stringify(response));
          this.InWait = JSON.parse(sessionStorage.getItem("attente"));

          if(this.InWait.length == 0){
            this.isInWait = false;
            this.rendezvousService.mw_note = 0;
          }else {
            this.isInWait = true;
            this.rendezvousService.mw_note = this.InWait.length;
            this.rendezvousService.m_notifications += this.InWait.length;
          }
        },
        (error) => {
          console.log(" erreur : ", error.message);
        }
      )
  }

  public ConfirmedRdv() {
    this.rendezvousService.findWithMedecin("ACCEPTER",this.medecinInfo.cin)
      .subscribe(
        (response) => {
          sessionStorage.removeItem("confirmed");
          sessionStorage.setItem("confirmed", JSON.stringify(response));
          this.Confirmed = JSON.parse(sessionStorage.getItem("confirmed"));

          if(this.Confirmed.length == 0){
            this.isConfirmed = false;
            this.rendezvousService.ma_note = 0;
          }else {
            this.isConfirmed = true;
            this.rendezvousService.m_notifications += this.Confirmed.length;
            this.rendezvousService.ma_note += this.Confirmed.length;

          }
        },
        (error) => {
          console.warn(" Erreur  " + error.message);
        }
      )
  }

  // Operations on rendez-vous

  Confirm(id_rdv): void{
    this.rendezvousService.editStatus("ACCEPTER",id_rdv)
      .subscribe(
        (response) => {
          this.ngOnInit();
        },
        (error) => {
          this.ngOnInit();
          console.log(" Erreur : " + error.message);
        }
      )
  }

  Reject(id_rdv): void{
    this.rendezvousService.editStatus("REFUSER", id_rdv)
      .subscribe(
        (response) => {
          this.ngOnInit();
        },
        (error) => {
          this.ngOnInit();
          console.log(" Erreur : " + error.message);
        }
      )
  }

  setPatient(username: string): void {
    this.patientService.getByUsername(username)
      .subscribe(
        (response) => {
          this.mailForm = new FormGroup({
            dest: new FormControl(response['email']),
            from: new FormControl("dravicennegroupe@gmail.com"),
            topic:new FormControl(''),
            body: new FormControl('')
          })
        }
      )
  }

  getDossier(username: string): void {
    this.dossierService.findWithPatient(username)
      .subscribe(
        (response) => {
          this.dossierMed= response;
        }
      )
  }

  setValues(username: string) : void {
    this.patientService.getByUsername(username)
      .subscribe(
        (response) => {
          this.smsForm = new FormGroup({
            nom: new FormControl(response['nom']),
            numero: new FormControl(response['phone']),
            message: new FormControl(''),
          })
        }
      )
  }

  sendMail(): void {
    this.mail = this.mailForm.value;
    this.mailService.sendMail(this.mail)
      .subscribe(
        () => {
          this.toast.info(" Votre mail à été envoyé avec succès !", "Sending")
        },
        (error) => {
          this.toast.error(" Erreur à l'envoi du mail ", error.title)
        }
      )
  }

  Sms(): void {
    const config = new MatDialogConfig();
    config.height = "40%";
    config.width = "30%";
    this.dialog.open(SmsComponent,config);
  }

  Mail(): void {
      const config = new MatDialogConfig();
      config.height = "85%";
      config.width = "55%";
      config.position = { top: `80px`}
      this.dialog.open(MailComponent,config);
  }

  openWindowCustomClass(mail) {
    this.modalService.open(mail, { windowClass: 'dark-modal' , centered: true, size: "lg"});
  }

  openSmallModal(Sms){
    this.modalService.open(Sms, { windowClass: 'dark-modal' , centered: true, size: "sm"});
  }

  openDossierModal(dossier){
    this.modalService.open(dossier, {windowClass: "myCustomModalClass" , centered: true, size: "sm"});
  }

  warningConfirm(confirm) {
    this.modalService.open(confirm, { centered: true, size: "sm" })
  }

  warningRefuse(refuse) {
    this.modalService.open(refuse, { centered: true, size: "sm" })
  }

  reload(): void {
    setTimeout(
      () => {
        location.reload();
      }, 1
    )
  }
}



import {Component, Inject, OnInit} from '@angular/core';
import {RendezVousService} from "../../../Services/rendezvous/rendez-vous.service";
import {MedecinService} from "../../../Services/medecinService/medecin.service";
import {MatDialog, MatDialogRef, MatDialogConfig} from "@angular/material/dialog";
import {MailComponent} from "../messagerie/mail/mail.component";
import {SmsComponent} from "../messagerie/sms/sms.component";

@Component({
  selector: 'app-list-rendez-vous',
  templateUrl: './list-rendez-vous.component.html',
  styleUrls: ['./list-rendez-vous.component.css']
})
export class ListRendezVousComponent implements OnInit {

  constructor(private rendezvousService: RendezVousService,
              private medecinService: MedecinService,
              public dialog: MatDialog) { }

  InWait: [] = null;
  isInWait = false;

  Confirmed: [] = null;
  isConfirmed = false;

  ngOnInit(): void {
    this.InWaitRdv();
    this.ConfirmedRdv();
  }

  public InWaitRdv() {
    this.rendezvousService.findWithMedecin("ATTENTE", this.medecinService.Cin)
      .subscribe(
        (response) => {
          this.InWait = response;
          if(this.InWait.length == 0){
            this.isInWait = false;
          }else {
            this.isInWait = true;
          }
        },
        (error) => {
          console.log(" erreur : ", error.message);
        }
      )
  }

  public ConfirmedRdv() {
    this.rendezvousService.findWithMedecin("ACCEPTER",this.medecinService.Cin)
      .subscribe(
        (response) => {
          this.Confirmed = response;
          if(this.Confirmed.length == 0){
            this.isConfirmed = false;
          }else {
            this.isConfirmed = true;
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
}



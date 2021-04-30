import { Component, OnInit } from '@angular/core';
import { MedecinService } from '../Services/medecinService/medecin.service';
import { PatientService } from '../Services/patientservice/patient.service';
import { UserService } from '../Services/userService/user.service';
import {Title} from "@angular/platform-browser";
import {RendezVousService} from "../Services/rendezvous/rendez-vous.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PatNotifComponent} from "../users/patient/pat-notif/pat-notif.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;
  hidden = false;

  isAuthenticated = false;
  constructor(
    public _service: UserService,
    public patientService: PatientService,
    public medecinService: MedecinService,
    public rdvService: RendezVousService,
    private title: Title,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onLoggedIn(): void {
    this.username = this._service.Username;
  }

  onLoggedOut(): void {
    this._service.logOut();
  }

  setTitle(title): void{
    this.title.setTitle(title + ' - DrAvicenne');
  }

  notifications(){
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.width = "20%";
    config.height = "50%"
    config.position = { right : `40px`, top : `100px`}
    this.dialog.open(PatNotifComponent,config);
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}

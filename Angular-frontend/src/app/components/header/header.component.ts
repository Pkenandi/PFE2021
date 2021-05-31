import { Component, OnInit } from '@angular/core';
import { MedecinService } from '../../Services/medecinService/medecin.service';
import { PatientService } from '../../Services/patientservice/patient.service';
import { UserService } from '../../Services/userService/user.service';
import {Title} from "@angular/platform-browser";
import {RendezVousService} from "../../Services/rendezvous/rendez-vous.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PatNotifComponent} from "../../users/patient/pat-notif/pat-notif.component";
import {MedNotifComponent} from "../../users/medecin/med-notif/med-notif.component";
import {Patient} from "../../Models/Patient/patient";
import {Medecin} from "../../Models/Medecin/medecin";
import {SpinnerService} from "../../Services/spinnerService/spinner.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;
  hidden = false;
  isAuthenticated = false;
  patAuth: boolean = false;
  medAuth: boolean = false;
  patientInfo: Patient;
  medecinInfo: Medecin;

  constructor(
    public _service: UserService,
    public patientService: PatientService,
    public medecinService: MedecinService,
    public rdvService: RendezVousService,
    private title: Title,
    private dialog: MatDialog,
    public spinner: SpinnerService) { }

  ngOnInit(): void {
    this.patientService.isAuth();
    this.medecinService.isAuth();
    this.isMedecinAuth();
    this.isPatientAuth();
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

  p_notifications(){
    const config = new MatDialogConfig();
    config.autoFocus = true;
    config.width = "20%";
    config.height = "50%"
    config.position = { right : `40px`, top : `100px`}
    this.dialog.open(PatNotifComponent,config);
  }

  m_notifications(){
    const config = new MatDialogConfig();
    config.width = "20%";
    config.height = "35%"
    config.position = { right : `40px`, top : `100px`}
    this.dialog.open(MedNotifComponent,config);
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  isPatientAuth(): void {
    // get values from sessions
    this.patientInfo = JSON.parse(sessionStorage.getItem("patient"));
    if(this.patientService.isAuth()){
      this.patAuth = true;
      this.patientService.getByUsername(this.patientInfo.username)
        .subscribe(
          (results) => {
            sessionStorage.setItem("patient",JSON.stringify(results));
            this.patientInfo = JSON.parse(sessionStorage.getItem("patient"));
          }
        )
    }else{
      this.patAuth = false;
    }
  }

  isMedecinAuth(): void {
    this.medecinInfo = JSON.parse(sessionStorage.getItem("medecin"));
    if(this.medecinService.isAuth()){
      this.medAuth = true;
      this.medecinService.getMedecinByCin(this.medecinInfo.cin)
        .subscribe(
          (results) => {
            sessionStorage.setItem("medecin",JSON.stringify(results));
            this.medecinInfo = JSON.parse(sessionStorage.getItem("medecin"));
          }
        )
    }else{
      this.medAuth = false;
    }
  }

  reload(): void {
    setTimeout(
      () => {
        location.reload();
      }, 5
    )
  }
}

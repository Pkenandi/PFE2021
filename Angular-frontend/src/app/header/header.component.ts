import { Component, OnInit } from '@angular/core';
import { MedecinService } from '../Services/medecinService/medecin.service';
import { PatientService } from '../Services/patientservice/patient.service';
import { UserService } from '../Services/userService/user.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;

  isAuthenticated = false;
  constructor(
    public _service: UserService,
    public patientService: PatientService,
    public medecinService: MedecinService,
    private title: Title) { }

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
}

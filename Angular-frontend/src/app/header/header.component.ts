import { Component, OnInit } from '@angular/core';
import { MedecinService } from '../Services/medecin.service';
import { PatientService } from '../Services/patient.service';
import { UserService } from '../Services/user.service';

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
    public medecinService: MedecinService) { }

  ngOnInit(): void {
  }

  onLoggedIn(): void
  {
    this.username = this._service.Username;
  }

  onLoggedOut(): void
  {
    this._service.logOut();
  }

}

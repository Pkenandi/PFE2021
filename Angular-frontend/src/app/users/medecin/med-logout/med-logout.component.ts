import { Component, OnInit } from '@angular/core';
import {MedecinService} from "../../../Services/medecinService/medecin.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-med-logout',
  templateUrl: './med-logout.component.html',
  styleUrls: ['./med-logout.component.css']
})
export class MedLogoutComponent implements OnInit {

  constructor(private medecinService: MedecinService, private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    sessionStorage.removeItem("medecin");
    sessionStorage.removeItem("ville");
    sessionStorage.removeItem("agenda");
    sessionStorage.removeItem("listDossiers");
    sessionStorage.removeItem("listTache");
    sessionStorage.removeItem("attente");
    sessionStorage.removeItem("confirmed");
    this.router.navigate(['mon-compte']);
  }

}

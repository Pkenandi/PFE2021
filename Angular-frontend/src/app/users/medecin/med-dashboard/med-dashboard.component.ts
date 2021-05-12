import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { UserService } from 'src/app/Services/userService/user.service';
import {MedecinService} from "../../../Services/medecinService/medecin.service";
import {Title} from "@angular/platform-browser";
import {Medecin} from "../../../Models/Medecin/medecin";

@Component({
  selector: 'app-med-dashboard',
  templateUrl: './med-dashboard.component.html',
  styleUrls: ['./med-dashboard.component.css']
})
export class MedDashboardComponent implements OnInit {

  medecinInfo: Medecin;

  constructor(public _service: UserService,
              public medecinService: MedecinService,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(" Tableau de bord - DrAvicenne ")
    this.medecinInfo = JSON.parse(sessionStorage.getItem("medecin"));
      //Toggle Click Function
    $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    });
  }

  reload(): void {
    setTimeout(
      () => {
        location.reload();
      }, 1
    )
  }
}

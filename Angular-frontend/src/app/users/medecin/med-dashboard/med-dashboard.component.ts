import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { UserService } from 'src/app/Services/userService/user.service';
import {MedecinService} from "../../../Services/medecinService/medecin.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-med-dashboard',
  templateUrl: './med-dashboard.component.html',
  styleUrls: ['./med-dashboard.component.css']
})
export class MedDashboardComponent implements OnInit {

  constructor(public _service: UserService, public medecinService: MedecinService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(" Tableau de bord - DrAvicenne ")
      //Toggle Click Function
    $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    });
  }

}

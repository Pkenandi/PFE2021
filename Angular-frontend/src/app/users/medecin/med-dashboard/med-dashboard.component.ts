import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { UserService } from 'src/app/Services/userService/user.service';
import {MedecinService} from "../../../Services/medecinService/medecin.service";

@Component({
  selector: 'app-med-dashboard',
  templateUrl: './med-dashboard.component.html',
  styleUrls: ['./med-dashboard.component.css']
})
export class MedDashboardComponent implements OnInit {

  constructor(public _service: UserService, public medecinService: MedecinService) { }

  ngOnInit(): void {
      //Toggle Click Function
    $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    });
  }

}

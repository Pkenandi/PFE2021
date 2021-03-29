import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-med-dashboard',
  templateUrl: './med-dashboard.component.html',
  styleUrls: ['./med-dashboard.component.css']
})
export class MedDashboardComponent implements OnInit {

  constructor(public _service: UserService) { }

  ngOnInit(): void {
      //Toggle Click Function
    $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    });

  }

}

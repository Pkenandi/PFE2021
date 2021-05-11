import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {RendezVousService} from "../../../Services/rendezvous/rendez-vous.service";

@Component({
  selector: 'app-med-notif',
  templateUrl: './med-notif.component.html',
  styleUrls: ['./med-notif.component.css']
})
export class MedNotifComponent implements OnInit {

  constructor(private title: Title,
              public rdvService: RendezVousService) { }

  ngOnInit(): void {
    this.title.setTitle(" Notifications - DrAvicenne ")
  }

}

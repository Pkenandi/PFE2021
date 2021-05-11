import { Component, OnInit } from '@angular/core';
import {RendezVousService} from "../../../Services/rendezvous/rendez-vous.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-pat-notif',
  templateUrl: './pat-notif.component.html',
  styleUrls: ['./pat-notif.component.css']
})
export class PatNotifComponent implements OnInit {

  constructor(public rdvService: RendezVousService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(" Notifications - DrAvicenne ")
  }

}

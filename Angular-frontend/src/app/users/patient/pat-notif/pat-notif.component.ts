import { Component, OnInit } from '@angular/core';
import {RendezVousService} from "../../../Services/rendezvous/rendez-vous.service";

@Component({
  selector: 'app-pat-notif',
  templateUrl: './pat-notif.component.html',
  styleUrls: ['./pat-notif.component.css']
})
export class PatNotifComponent implements OnInit {

  constructor(public rdvService: RendezVousService) { }

  ngOnInit(): void {
  }

}

import {FormGroup, FormControl, NgForm, FormsModule} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Medecin} from '../../Models/Medecin/medecin';
import {MedecinService} from '../../Services/medecinService/medecin.service';
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {Title} from "@angular/platform-browser";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

declare const L:any;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  cin: string = null;
  private sub: Subscription;
  medecin: Medecin = null;
  medecins: Medecin[];
  specialite: string;
  page = 1;

  constructor(public _service: MedecinService,
              private _router: Router,
              private activatedRoute: ActivatedRoute,
              private title: Title,
              private modalService: NgbModal,) {
  }

  ngOnInit(): void {
    this._service.getMedecins().subscribe(
      data => {
        sessionStorage.removeItem("medecins");
        sessionStorage.setItem("medecins",JSON.stringify(data))
        this.medecins = JSON.parse(sessionStorage.getItem("medecins"));
      });

    this._service.getMedecinByCin(this.cin).pipe(
      map((medecin: Medecin) => this.medecin = medecin))
      .subscribe(
        result => {
          sessionStorage.removeItem("medecin");
          sessionStorage.setItem("medecin",JSON.stringify(result))
          this.medecin = JSON.parse(sessionStorage.getItem("medecin"));
          this.asCredentials();
        }
      );

    // Position On Maps

    if(!navigator.geolocation){
      console.log(" Location is not supported")
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`);
        let map = L.map('mapid').setView([35.7779900, 10.8261700], 15)
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGtlbmFuZGkiLCJhIjoiY2twZGRnOXBlMWw5djJzb2diZDU0emV5MSJ9.50r0n3mM0tRGq0CRlvfu-g', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'your.mapbox.access.token'
        }).addTo(map);
      });

  }

  public getMedecins(): void {
    this._service.getMedecins().subscribe(
      data => {
        this.medecins = data;
      });
  }

  asCredentials(): boolean {
    return this.medecin.picture !== null;
  }

  setCin(cin) {
    this.cin = cin;
    this.ngOnInit();
  }

  setTitle(title): void {
    this.title.setTitle(title + ' - DrAvicenne ');
  }

  public searchFilter(): void {
    if (this.specialite === '') {
      this.ngOnInit();
    } else {
      this.medecins = this.medecins.filter(
        res => {
        return res.specialite.toLowerCase().match(this.specialite.toLowerCase());
      });
    }
  }

  reload(): void {
    setTimeout(
      () => {
        location.reload();
      }, 5
    )
  }

  openProfileModal(content): void {
    this.modalService.open(content, {centered: true, size: "lg"})
  }
}

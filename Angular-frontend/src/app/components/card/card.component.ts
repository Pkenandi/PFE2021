import {FormGroup, FormControl, NgForm, FormsModule} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Medecin} from '../../Models/Medecin/medecin';
import {MedecinService} from '../../Services/medecinService/medecin.service';
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {Title} from "@angular/platform-browser";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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
        }
      );
  }

  public getMedecins(): void {
    this._service.getMedecins().subscribe(
      data => {
        this.medecins = data;
      });
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

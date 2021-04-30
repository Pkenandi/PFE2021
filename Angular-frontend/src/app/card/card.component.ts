import {FormGroup, FormControl, NgForm, FormsModule} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Medecin} from '../Models/Medecin/medecin';
import {MedecinService} from '../Services/medecinService/medecin.service';
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {Title} from "@angular/platform-browser";

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
  specialite: any;
  page = 1;

  constructor(public _service: MedecinService,
              private _router: Router,
              private activatedRoute: ActivatedRoute,
              private title: Title)
  { }

  ngOnInit(): void {
    this._service.getMedecins().subscribe(
      data => {
        this.medecins = data;
      });

    this._service.getMedecinByCin(this.cin).pipe(
      map(
        (medecin: Medecin) => this.medecin = medecin)
    ).subscribe(
      result => {
        this.medecin = result;
        this._service.medecin = this.medecin;
        this._service.ville = result['ville'];
      }
    );
  }

  public getMedecins(): void {
    this._service.getMedecins().subscribe(
      data => {
        this.medecins = data;
        console.log(this.medecins);
      });
  }

  setCin(cin){
    this.cin = cin;
    this.ngOnInit();
  }
  setTitle(title): void{
    this.title.setTitle(title + ' - DrAvicenne ');
  }

  public searchFilter(): void {
    if (this.specialite === '') {
      this.ngOnInit();
    } else {
      this.medecins = this.medecins.filter(res => {
        return res.specialite.toLowerCase().match(this.specialite.toLowerCase());
      });
    }
  }
}


import { FormGroup, FormControl, NgForm, FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Medecin } from '../Models/Medecin/medecin';
import { MedecinService } from '../Services/medecin.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  medecins: Medecin[];
  specialite: any;
  page =  1;

  constructor(public _service: MedecinService, private _router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._service.getMedecins().subscribe(
      data => {
        this.medecins = data;
      });
  }

  public getMedecins(): void
  {
    this._service.getMedecins().subscribe(
      data => {
        this.medecins = data;
        console.log(this.medecins);
      });
  }

  public showProfile(cin: string): void
  {
    this._router.navigate(['../medecin/' + cin], { relativeTo: this.activatedRoute});
  }

  public searchFilter(): void
  {
    if (this.specialite === '')
    {
      this.ngOnInit();
    }else
    {
      this.medecins = this.medecins.filter(res => {
        return res.specialite.toLowerCase().match(this.specialite.toLowerCase());
      });
    }
  }
}

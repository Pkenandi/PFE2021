import { FormGroup, FormControl } from '@angular/forms';
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

  public searchFilter(key: string): void
  {
    const results: Medecin[] = [];

    for ( const medecin of this.medecins)
    {
      if ( medecin.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      medecin.Ville.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      medecin.specialite.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      {
        results.push(medecin);
      }

      this.medecins = results;

      if ( results.length === 0 || !key)
      {
        this.getMedecins();
      }
    }
  }
}

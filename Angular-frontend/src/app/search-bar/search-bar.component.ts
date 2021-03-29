import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CardComponent } from '../card/card.component';
import { Medecin } from '../Models/Medecin/medecin';
import { MedecinService } from '../Services/medecin.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchForm = new FormGroup({
    nom: new FormControl(''),
    specialite: new FormControl(''),
    ville: new FormControl('')
  });

  medecins: Medecin[];

  constructor(private _service: MedecinService) { }

  ngOnInit(): void {
    this.getMedecins();
  }

  getMedecins(): void
  {
    this._service.getMedecins().subscribe(
      (medecins: Medecin[]) => {
      this.medecins = medecins;
      console.log(this.medecins);
    },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }

  searchMedecin(key: string): void
  {
    const result: Medecin[] = [];

    for (const medecin of this.medecins)
    {
      if (medecin.getNom().toLowerCase().indexOf(key.toLowerCase()) !== -1
      || medecin.getSpecialite().toLowerCase().indexOf(key.toLowerCase()) !== -1
      || medecin.getVille().toLowerCase().indexOf(key.toLowerCase()) !== -1)
      {
        result.push(medecin);
      }

      this._service.medecins = result;

      if (result.length === 0 || !key)
      {
        this.getMedecins();
      }
    }
  }
}

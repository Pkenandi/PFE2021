import { Component, OnInit } from '@angular/core';
import { Medecin } from '../Models/Medecin/medecin';
import { MedecinService } from '../Services/medecin.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  medecins: Medecin[];

  constructor(private _service: MedecinService) { }

  ngOnInit(): void {
    this.getMedecins();
  }

  public getMedecins(): void
  {
    this._service.getMedecins().subscribe(
      data => {
        this.medecins = data;
        console.log(this.medecins);
      });
  }
}

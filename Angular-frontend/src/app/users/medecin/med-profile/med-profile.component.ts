import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Medecin } from 'src/app/Models/Medecin/medecin';
import { MedecinService } from 'src/app/Services/medecin.service';

@Component({
  selector: 'app-med-profile',
  templateUrl: './med-profile.component.html',
  styleUrls: ['./med-profile.component.css']
})
export class MedProfileComponent implements OnInit, OnDestroy{

  cin: string = null;
  private sub: Subscription;
  medecin: Medecin = null;

  constructor(
    public medService: MedecinService,
    public activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(
      params => {
        this.cin = params['cin'];

        this.medService.getMedecinByCin(this.cin).pipe(
          map((medecin: Medecin) => this.medecin = medecin)
        ).subscribe();
      }
    );
  }

  // tslint:disable-next-line: typedef
  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }

}

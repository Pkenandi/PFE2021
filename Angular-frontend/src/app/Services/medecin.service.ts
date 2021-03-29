import { Injectable } from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import { User } from '../Models/User/user';
import { Patient } from '../Models/Patient/patient';
import { Medecin } from '../Models/Medecin/medecin';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { basedUrl } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  log = false;
  medecins: Medecin[];

  constructor(private _http: HttpClient) { }

  getMedecins(): Observable<Medecin[]>
  {
    return this._http.get<Medecin[]>(`${basedUrl}medecin/all`);
  }

  getMedecinByCin(cin: string): Observable<Medecin>
  {
    return this._http.get<Medecin>(`${basedUrl}medecin/${cin}`)
               .pipe(map((medecin: Medecin) => medecin));
  }

}

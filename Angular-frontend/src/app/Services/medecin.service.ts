import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { User } from '../Models/User/user';
import { Patient } from '../Models/Patient/patient';
import { Medecin } from '../Models/Medecin/medecin';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  medUrl = 'http://localhost:8080/user/medecin/findByNom/';
  allMed = 'http://localhost:8080/user/medecin/all';

  constructor(private _http: HttpClient) { }

  getMedecins(): Observable<Medecin[]>
  {
    return this._http.get<Medecin[]>(this.allMed);
  }

}

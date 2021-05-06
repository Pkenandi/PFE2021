import { Injectable } from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import { User } from '../../Models/User/user';
import { Patient } from '../../Models/Patient/patient';
import { Medecin } from '../../Models/Medecin/medecin';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {basedUrl, mainUrl} from 'src/environments/environment';
import { map } from 'rxjs/operators';
import {UserService} from "../userService/user.service";


@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  log = false;
  Cin: string;
  ville: string;
  medecins: Medecin[];
  medecin: Medecin;

  constructor(private _http: HttpClient, private userService: UserService) { }

  getMedecins(): Observable<Medecin[]> {
    return this._http.get<Medecin[]>(`${basedUrl}medecin/all`);
  }

  getMedecinByCin(cin: string): Observable<Medecin>{
    return this._http.get<Medecin>(`${basedUrl}medecin/${cin}`)
               .pipe(map((medecin: Medecin) => medecin));
  }

  update(data, cin): Observable<any>{
    return this._http.put<any>(`${basedUrl}medecin/update/${cin}`, data);
  }

  logOut(): void{
    this.userService.logOut();
    this.log = false;
  }

  Login(cin, password): Observable<any>{
    return this.userService.loginMedecin(cin, password);
  }

  attachToRendezVous(cin: string, id: number): Observable<any>{
    return this._http.get<any>(`${basedUrl}/medecin/${cin}/rendezvous/${id}/assign`);
  }

  attachToAgenda(cin: string, id: number): Observable<any>{
    return this._http.get<any>(`${mainUrl}user/agenda/${id}/medecin/${cin}`);
  }

}

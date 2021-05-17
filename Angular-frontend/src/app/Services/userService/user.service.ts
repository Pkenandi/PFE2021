import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {basedUrl, mainUrl} from 'src/environments/environment';
import {Patient} from "../../Models/Patient/patient";
import {Medecin} from "../../Models/Medecin/medecin";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isAuthenticated = false;
  message: any;
  Username;
  isLoggedIn = false;

  constructor(private _http: HttpClient, private router: Router) {}

  // tslint:disable-next-line: typedef
  setIsAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  // Registrations Methods

  registerPatient(user: any): Observable<any>{
    return this._http.post(`${mainUrl}user/patient/register`, user, {responseType: 'text'});
  }

  registerMedecin(user: any): Observable<any> {
    return this._http.post(`${mainUrl}user/medecin/register`, user, {responseType: 'text'});
  }

  // Log methods


  loginPatient(username: string, password: string): Observable<Patient> {
    return this._http.post<Patient>(`${mainUrl}user/patient/login`, { username, password});
  }

  loginMedecin(cin: string, password: string): Observable<Medecin> {
    return this._http.post<Medecin>(`${mainUrl}user/medecin/login`, { cin, password });
  }

  logOut(): void {
    this.setIsAuthenticated(false);
    this.isLoggedIn = false;
  }

}

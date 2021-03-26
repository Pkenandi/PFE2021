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

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isAuthenticated = false;
  message: any;
  username = '';

  // registrations

  PatUrl = 'http://localhost:8080/user/patient/register';
  MedUrl = 'http://localhost:8080/user/medecin/register';

  // Login

  logPatUrl = 'http://localhost:8080/user/patient/login';
  logMedUrl = 'http://localhost:8080/user/medecin/login';
  mainUrl = 'http://localhost:8080/';

  constructor(private _http: HttpClient, private router: Router) {}

  // Registrations Methods

  registerPatient(user: any): Observable<any>{
    return this._http.post(this.PatUrl, user);
  }

  registerMedecin(user: any): Observable<any> {
    return this._http.post(this.MedUrl, user);
  }

  // Log methods

  logoutPatient(): void {
    this.isAuthenticated = false;
    this.router.navigate(['../pat/login']);
  }

  logoutMedecin(): void {
    this.isAuthenticated = false;
    this.router.navigate(['../medecin/login']);
  }

  loginPatient(username: string, password: string): Observable<any> {
      return this._http.post(this.logPatUrl, { username, password});
  }

  loginMedecin(cin: string, password: string): Observable<any> {
    return this._http.post(this.logMedUrl, { cin, password });
  }

}

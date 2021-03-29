import { Injectable } from '@angular/core';
import {PatLoginComponent} from '../users/patient/pat-login/pat-login.component';
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
import { basedUrl } from 'src/environments/environment';

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

  constructor(private _http: HttpClient, private router: Router) {}

  // tslint:disable-next-line: typedef
  setIsAuthenticated(value: boolean)
  {
    this.isAuthenticated = value;
  }

  getIsAuthenticated(): boolean
  {
    return this.isAuthenticated;
  }

  // Registrations Methods

  registerPatient(user: any): Observable<any>{
    return this._http.post(`${basedUrl}patient/register`, user, {responseType: 'text'});
  }

  registerMedecin(user: any): Observable<any> {
    return this._http.post(`${basedUrl}medecin/register`, user, {responseType: 'text'});
  }

  // Log methods


  loginPatient(username: string, password: string): Observable<any> {

    return this._http.post(`${basedUrl}patient/login`, { username, password});
  }

  loginMedecin(cin: string, password: string): Observable<any> {
    return this._http.post(`${basedUrl}medecin/login`, { cin, password });
  }

  isLoggedIn(): boolean
  {
    const user = sessionStorage.getItem('name');

    if (user === null)
     {
       return false;
      }
    else
    {
      return true;
    }
  }

  logOut(): void
  {
    this.setIsAuthenticated(false);
    sessionStorage.removeItem('name');
  }

}

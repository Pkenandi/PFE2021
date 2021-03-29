import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { basedUrl, mainUrl } from 'src/environments/environment';
import { Patient } from '../Models/Patient/patient';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

Username: any;
log = false;
showMed = true;
showDossier = false;

  constructor(
    private _service: UserService,
    private _http: HttpClient) { }

  Login(username, password): Observable<any>
  {
    return this._service.loginPatient(username, password);
  }

  // tslint:disable-next-line: typedef
  LogOut()
  {
    this._service.logOut();
    this.log = false;
  }

  hasDossierMedical(Username: string): Observable<any>
  {
    return this._http.get<any>(`${mainUrl}dossier/patient/${Username}`);
  }

  getByUsername(username: string): Observable<Patient>
  {
      return this._http.get<Patient>(`${basedUrl}patient/${username}`);
  }
}

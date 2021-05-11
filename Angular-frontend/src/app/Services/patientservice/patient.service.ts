import { HttpClient } from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { basedUrl, mainUrl } from 'src/environments/environment';
import { Patient } from '../../Models/Patient/patient';
import { UserService } from '../userService/user.service';
import {stringify} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class PatientService implements OnInit{

Username: any;
name: string = "";
lastName: any;

log = false;
showMed = true;
patient: Patient = JSON.parse(sessionStorage.getItem("patient"));

  constructor(
    private _service: UserService,
    private _http: HttpClient) { }

  ngOnInit(): void {
    this.isAuth();
  }

  isAuth(): boolean {
    if(this.patient != null){
      return true;
    }else{
      return false;
    }
  }

  Login(username, password): Observable<any> {
    return this._service.loginPatient(username, password);
  }

  // tslint:disable-next-line: typedef
  LogOut() {
    this._service.logOut();
    this.log = false;
  }

  hasDossierMedical(Username: string): Observable<any> {
    return this._http.get<any>(`${mainUrl}dossier/patient/${Username}`);
  }

  getByUsername(username: string): Observable<Patient> {
      return this._http.get<Patient>(`${basedUrl}patient/${username}`);
  }

  updatePatient(patientDetails, username): Observable<any> {
    return this._http.put<any>(`${basedUrl}patient/update/${username}`, patientDetails);
  }

  addRendezVous(username: string, id: number): Observable<any>{
    return this._http.get<any>(`${basedUrl}/patient/${username}/rendezvous/${id}/add`);
  }

}

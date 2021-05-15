import { HttpClient } from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { basedUrl, mainUrl } from 'src/environments/environment';
import { Patient } from '../../Models/Patient/patient';
import { UserService } from '../userService/user.service';
import {UsernameDto} from "../../Models/reset/Dto/Username/username-dto";
import {ResetDto} from "../../Models/reset/Dto/Reset/reset-dto";
import {Email} from "../../Models/reset/Dto/email/email";
import {Mail} from "../../Models/reset/Dto/mail/mail";

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

  // Reset Password
  check(resetForm): Observable<any>{
    return this._http.post<UsernameDto>(`${mainUrl}user/patient/username/check`, resetForm)
  }

  checkEmail(email: string): Observable<any>{
    return this._http.get(`${mainUrl}user/patient/check/${email}`);
  }

  reset(Reset: ResetDto, username: string): Observable<any>{
   return this._http.post<ResetDto>(`${mainUrl}user/patient/${username}/reset`,Reset)
  }

  sendLink(mail: Mail, email: string): Observable<any> {
    return this._http.post<Mail>(`${mainUrl}user/patient/${email}/reset-password`,mail)
  }

}

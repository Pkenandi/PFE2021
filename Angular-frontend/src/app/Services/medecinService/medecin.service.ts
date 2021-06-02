import { Injectable } from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import { Medecin } from '../../Models/Medecin/medecin';
import { Observable } from 'rxjs';
import {basedUrl, mainUrl} from 'src/environments/environment';
import { map } from 'rxjs/operators';
import {UserService} from "../userService/user.service";
import {CinDto} from "../../Models/reset/Dto/Cin/cin-dto";
import {ResetDto} from "../../Models/reset/Dto/Reset/reset-dto";
import {Mail} from "../../Models/reset/Dto/mail/mail";


@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  log = false;
  Cin: string;
  ville: string;
  nom: string = "";
  medecins: Medecin[];

  constructor(private _http: HttpClient, private userService: UserService) { }

  medecin: Medecin = JSON.parse(sessionStorage.getItem("medecin"))
  credentials = false;

  isAuth(): boolean {
    if(this.medecin != null){
      return true;
    }else{
      return false;
    }
  }

  getMedecins(): Observable<Medecin[]> {
    return this._http.get<Medecin[]>(`${mainUrl}user/medecin/all`);
  }

  getMedecinByCin(cin: string): Observable<Medecin>{
    return this._http.get<Medecin>(`${mainUrl}user/medecin/${cin}`)
               .pipe(map((medecin: Medecin) => medecin));
  }

  update(data, cin): Observable<any>{
    return this._http.put<any>(`${mainUrl}user/medecin/update/${cin}`, data);
  }

  logOut(): void{
    this.userService.logOut();
    this.log = false;
  }

  check(resetForm): Observable<any>{
    return this._http.post<CinDto>(`${mainUrl}user/medecin/cin/check`,resetForm)
  }

  reset(Reset: ResetDto, cin: string): Observable<any>{
    return this._http.post<ResetDto>(`${mainUrl}user/medecin/${cin}/reset`,Reset)
  }

  checkEmail(email: string): Observable<any>{
    return this._http.get(`${mainUrl}user/medecin/check/${email}`);
  }

  sendLink(mail: Mail, email: string): Observable<any> {
    return this._http.post<Mail>(`${mainUrl}user/medecin/${email}/reset-password`,mail)
  }

  Login(cin, password): Observable<any>{
    return this.userService.loginMedecin(cin, password);
  }

  attachToRendezVous(cin: string, id: number): Observable<any>{
    return this._http.get<any>(`${mainUrl}user/medecin/${cin}/rendezvous/${id}/assign`);
  }

  attachToAgenda(cin: string, id: number): Observable<any>{
    return this._http.get<any>(`${mainUrl}user/agenda/${id}/medecin/${cin}`);
  }

  deleteAgenda(cin: String, id: number): Observable<any>{
    return this._http.get<any>(`${mainUrl}user/agenda/${id}/${cin}/delete`);
  }

}

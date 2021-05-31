import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {mainUrl} from "../../../environments/environment";
import {RendezVous} from "../../Models/RendezVous/rendez-vous";

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  // Medecin

  m_notifications: number = 0;
  mw_note: number = 0;
  ma_note: number = 0;

  // Patient

  p_notifications: number = 0;
  pw_note: number = 0;
  pa_note: number = 0;
  pr_note: number = 0;

  constructor(private http: HttpClient) { }

  //Patient

  findById(id: number): Observable<RendezVous> {
    return this.http.get<RendezVous>(`${mainUrl}rendezVous/${id}`);
  }

  findByStatus(status, username): Observable<any>{
    return this.http.get<any>(`${mainUrl}rendezVous/getByStatus/${status}/patient/${username}`);
  }

  createRendezVous(data: RendezVous): Observable<any>{
    return this.http.post<any>(`${mainUrl}rendezVous`, data);
  }

  editStatus(status: string, id_rdv): Observable<any>{
    return this.http.get<any>(`${mainUrl}rendezVous/cancel/${id_rdv}/${status}`);
  }

  deleteRdv(id_rdv): Observable<any>{
    return this.http.delete(`${mainUrl}/rendezVous/${id_rdv}`);
  }

  findWithMedecin(status, cin): Observable<any>{
    return this.http.get<any>(`${mainUrl}rendezVous/getWithMedecin/${status}/medecin/${cin}`);
  }

  findWithMedecinAndPatient(cin: string, username: string): Observable<RendezVous>{
    return this.http.get<RendezVous>(`${mainUrl}rendezVous/${cin}/${username}`);
  }

}

import { DossierMedical } from '../../Models/DossierMedical/dossier-medical';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mainUrl } from 'src/environments/environment';
import { Tab } from '../../Models/tab';

@Injectable({
  providedIn: 'root'
})
export class DossierMedicalService {

  constructor(private http: HttpClient) { }

  addDossier(dossier): Observable<any> {
    return this.http.post<any>(`${mainUrl}dossier`, dossier);
  }

  delete(id: number): Observable<DossierMedical>{
    return this.http.delete<DossierMedical>(`${mainUrl}delete/${id}`)
  }

  attachPatient(username: string, id: number ): Observable<any>{
    return this.http.get(`${mainUrl}user/patient/${username}/dossier/${id}/attach`);
  }

  attachMedecin(cin: string, id: number): Observable<any>{
    return this.http.get(`${mainUrl}user/medecin/${cin}/dossier/${id}`);
  }

  findWithPatient(username): Observable<DossierMedical>{
    return this.http.get<DossierMedical>(`${mainUrl}dossier/patient/${username}`);
  }

  findWithMedecin(cin: string): Observable<DossierMedical[]>{
    return this.http.get<DossierMedical[]>(`${mainUrl}/dossier/medecin/${cin}`)
  }
}

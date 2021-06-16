import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {mainUrl} from "../../../environments/environment";
import {Medecin} from "../../Models/Medecin/medecin";
import {Patient} from "../../Models/Patient/patient";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  // for patient
  setPatientPic(formData: FormData, username: string): Observable<HttpEvent<string[]>>{
    return this.http.post<string[]>(`${mainUrl}file/upload/patient/${username}`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  // for médecin
  setMedecinPic(formData: FormData, cin: string): Observable<HttpEvent<string[]>>{
    return this.http.post<string[]>(`${mainUrl}file/upload/medecin/${cin}`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  removePictureMedecin(cin: string): Observable<Medecin>{
    return this.http.get<Medecin>(`${mainUrl}file/remove/medecin/${cin}`)
  }

  removePicturePatient(username: string): Observable<Patient>{
    return this.http.get<Patient>(`${mainUrl}file/remove/patient/${username}`);
  }

  download(filename: string): Observable<HttpEvent<Blob>>{
    return this.http.get(`${mainUrl}file/download/${filename}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    })
  }
}

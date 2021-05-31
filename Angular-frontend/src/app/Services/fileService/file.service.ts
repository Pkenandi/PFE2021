import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {mainUrl} from "../../../environments/environment";

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

  download(filename: string): Observable<HttpEvent<Blob>>{
    return this.http.get(`${mainUrl}file/download/${filename}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    })
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Specialite} from "../../Models/spacialite/specialite";
import {mainUrl} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  constructor(private http: HttpClient) { }

  add(specialite: Specialite): Observable<Specialite>{
    return this.http.post<Specialite>(`${mainUrl}specialite`,specialite)
  }

  addMedecin(id: number, cin: string): Observable<Specialite>{
    return this.http.get<Specialite>(`${mainUrl}specialite/${id}/medecin/${cin}`);
  }

  getWithMedecin(id: number): Observable<Specialite[]>{
    return this.http.get<Specialite[]>(`${mainUrl}specialite/medecin/${id}`)
  }
}

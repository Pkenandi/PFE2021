import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {mainUrl} from "../../../environments/environment";
import {RendezVous} from "../../Models/RendezVous/rendez-vous";

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  constructor(private http: HttpClient) { }

  findByStatus(status, username): Observable<any>{
    return this.http.get<any>(`${mainUrl}rendezVous/getByStatus/${status}/patient/${username}`);
  }
}

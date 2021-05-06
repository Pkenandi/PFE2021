import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {mainUrl} from "../../../environments/environment";
import {Agenda} from "../../Models/agenda/agenda";
import {Tache} from "../../Models/tache/tache";

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  tache: Tache = null;

  constructor(private http: HttpClient) { }

  create(agenda): Observable<any>{
    return this.http.post(`${mainUrl}agenda`, agenda);
  }

  get(cin): Observable<Agenda>{
    return this.http.get<Agenda>(`${mainUrl}agenda/medecin/${cin}`);
  }

  edit(agenda, id): Observable<Agenda>{
    return this.http.put<Agenda>(`${mainUrl}agenda/edit/${id}`,agenda)
  }

  addTasks(id_agenda, id_tache): Observable<any>{
    return this.http.get(`${mainUrl}agenda/add/${id_agenda}/${id_tache}`);
  }
}

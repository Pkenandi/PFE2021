import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {mainUrl} from "../../../environments/environment";
import {Tache} from "../../Models/tache/tache";

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(private http: HttpClient) { }

  listTasks: Tache[] = [];
  subject = new Subject<any>();

  sendEvent(){
    this.subject.next();
  }

  getEvent(): Observable<any>{
    return this.subject.asObservable()
  }
  create(tache): Observable<Tache>{
    return this.http.post<Tache>(`${mainUrl}tache`,tache);
  }

  getAll(agenda_id):Observable<Tache[]>{
    return this.http.get<Tache[]>(`${mainUrl}tache/agenda/${agenda_id}`);
  }
}

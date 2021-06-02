import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Horraire} from "../../Models/horraire/horraire";
import {mainUrl} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HorraireService {

  constructor(private _http: HttpClient) { }

  save(horraire: Horraire, cin: string): Observable<Horraire>{
    return this._http.post<Horraire>(`${mainUrl}user/horraire/${cin}`, horraire);
  }

  get(id: number): Observable<Horraire[]>{
    return this._http.get<Horraire[]>(`${mainUrl}horraire/medecin/${id}`);
  }

  getOne(id: number): Observable<Horraire> {
    return this._http.get<Horraire>(`${mainUrl}horraire/get/${id}`);
  }

  delete(id: number): Observable<Horraire>{
    return this._http.delete<Horraire>(`${mainUrl}horraire/delete/${id}`);
  }

  editHorraire(horraire, id: number): Observable<Horraire>{
    return this._http.put<Horraire>(`${mainUrl}horraire/edit/${id}`, horraire)
  }
}

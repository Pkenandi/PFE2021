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

  get(id: number): Observable<Horraire[]>{
    return this._http.get<Horraire[]>(`${mainUrl}horraire/medecin/${id}`);
  }
}

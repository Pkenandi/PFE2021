import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Mail} from "../../Models/messagerie/mail/mail";
import {Observable} from "rxjs";
import {mainUrl} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  sendMail(mail: Mail): Observable<Mail>{
    return this.http.post<Mail>(`${mainUrl}mail/send`, mail);
  }
}

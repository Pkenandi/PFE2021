import { Injectable, Injector } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { PatientService } from "../patientservice/patient.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let patientService = this.injector.get(PatientService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${patientService.getToken()}`
      }
    });

    return next.handle(tokenizedReq);
  }
}

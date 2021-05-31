import { Injectable } from '@angular/core';
import {SpinnerService} from "../spinnerService/spinner.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private spinner: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.isLoading.next(true);

    return next.handle(req).pipe(
      finalize(
        () => {
          this.spinner.isLoading.next(false)
        }
      )
    )
  }
}

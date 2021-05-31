import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {fakeAsync} from "@angular/core/testing";
import {finalize} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService{

  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

}

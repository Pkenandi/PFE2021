import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Patient} from "../../Models/Patient/patient";

@Injectable({
  providedIn: 'root'
})

export class PatGuardGuard implements CanActivate {
  patientSession: Patient = JSON.parse(sessionStorage.getItem("patient"));
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.patientSession != null){
      return true
    }else{
      return false
    }
  }

}

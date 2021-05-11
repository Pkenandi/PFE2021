import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Medecin} from "../../Models/Medecin/medecin";

@Injectable({
  providedIn: 'root'
})
export class MedGuardGuard implements CanActivate {
  medecinSession: Medecin = JSON.parse(sessionStorage.getItem("medecin"));
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.medecinSession != null){
      return true;
    }else{
      return false;
    }
  }

}

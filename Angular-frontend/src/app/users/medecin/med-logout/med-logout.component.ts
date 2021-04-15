import { Component, OnInit } from '@angular/core';
import {MedecinService} from "../../../Services/medecin.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-med-logout',
  templateUrl: './med-logout.component.html',
  styleUrls: ['./med-logout.component.css']
})
export class MedLogoutComponent implements OnInit {

  constructor(private medecinService: MedecinService, private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.medecinService.logOut();
    this.toaster.success("Vous êtes deconnectez !");
    this.router.navigate(['mon-compte']);
  }


}

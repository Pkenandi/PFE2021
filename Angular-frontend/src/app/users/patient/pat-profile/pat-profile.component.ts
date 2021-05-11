import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/Models/Patient/patient';
import { PatientService } from 'src/app/Services/patientservice/patient.service';
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-pat-profile',
  templateUrl: './pat-profile.component.html',
  styleUrls: ['./pat-profile.component.css']
})
export class PatProfileComponent implements OnInit {

  updateForm = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    age: new FormControl(''),
    ville: new FormControl(''),
    email: new FormControl(''),
    groupeSang: new FormControl(''),
    phone: new FormControl(''),
    dateNaiss: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    cpassword: new FormControl('')
  });

  constructor(public patientService: PatientService,
              private route: ActivatedRoute,
              private toaster: ToastrService,
              private title: Title) { }

  profileInfo: Patient = JSON.parse(sessionStorage.getItem("patient"));
  UpdatedDetails: Patient;
  date = new Date();

  ngOnInit(): void {
    this.title.setTitle(" Profile - DrAvicenne ")
    this.patientService.getByUsername(this.route.snapshot.params.username).subscribe(
      results => {
        this.updateForm = new FormGroup({
          nom: new FormControl(results['nom']),
          prenom: new FormControl(results['prenom']),
          age: new FormControl(results['age']),
          dateNaiss: new FormControl(results['dateNaiss']),
          groupeSang: new FormControl(results['groupeSang']),
          ville: new FormControl(results['ville']),
          phone: new FormControl(results['phone']),
          email: new FormControl(results['email']),
          username: new FormControl(results['username']),
          password: new FormControl(results['password']),
          cpassword: new FormControl(results['cpassword']),
        });
      }
    )
  }

  UpdatePatient(): void {
    this.UpdatedDetails = this.updateForm.value;

    this.patientService.updatePatient(this.UpdatedDetails , this.route.snapshot.params.username).subscribe(
      response => {
        sessionStorage.removeItem("patient");
        this.profileInfo = this.UpdatedDetails;
        sessionStorage.setItem("patient",JSON.stringify(this.UpdatedDetails));
        this.toaster.success(
          "Vos informations ont étaient modifiées le \n"
          + this.date.getDate()
          + "-" + this.date.getMonth()
          + "-" + this.date.getFullYear(),
          "Modification");
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(
          "Désoler, impossible de modifier vos informations !! \n",
          " => " + error.type);
      });
  }

}

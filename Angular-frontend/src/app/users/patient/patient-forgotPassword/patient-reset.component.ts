import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PatientService} from "../../../Services/patientservice/patient.service";
import {UsernameDto} from "../../../Models/reset/Dto/Username/username-dto";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Email} from "../../../Models/reset/Dto/email/email";
import {Mail} from "../../../Models/reset/Dto/mail/mail";

@Component({
  selector: 'app-patient-reset',
  templateUrl: './patient-reset.component.html',
  styleUrls: ['./patient-reset.component.css']
})
export class PatientResetComponent implements OnInit {

  resetFormUsername = new FormGroup({
    username: new FormControl(''),
  });

  resetFormEmail = new FormGroup({
    email: new FormControl(''),
  });

  usernameDto: UsernameDto;
  emailDto: Email;
  mailDto: Mail;
  message = "";
  not_found = false;
  is_found = false;

  constructor(private patientService: PatientService,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  checkUsername(): void {
    this.usernameDto = this.resetFormUsername.value;
    this.patientService.check(this.usernameDto)
      .subscribe(
        (response) => {
          sessionStorage.setItem("response",JSON.stringify(response));
          this.not_found = false;
          this.resetFormUsername.reset({});
          this.reload();
          this.router.navigate(['../../../user/patient/reset-password'])
        },
        () => {
          this.not_found = true;
          this.message = " Pas de patient trouver avec ce nom d'utilisateur ! "
        }
      )
  }

  checkEmail(): void {
    this.emailDto = this.resetFormEmail.value;
    this.patientService.checkEmail(this.emailDto.email)
      .subscribe(
        (response) => {
          if(response != null){
            sessionStorage.setItem("response",JSON.stringify(response));
            this.is_found = true;
            this.not_found = false;
            this.resetFormEmail.reset({})

            this.mailDto = new Mail(
              this.emailDto.email,
              "Lien de réinitialisation : http://localhost:4200/user/patient/reset-password",
              "Réinitialisation mon de passe");

            // send link
            this.patientService.sendLink(this.mailDto,this.emailDto.email)
              .subscribe(
                (answer) => {
                  console.log(answer);
                },
                () => {
                  console.log(" Erreur lors de l'envoi du mail ");
                }
              )
          }else {
            this.is_found = false;
            this.not_found = true;
            this.message = " Aucun patient trouver avec cet Email ! "
          }
        },
        (error) => {
          this.is_found = false;
        }
      )
  }

  reload(): void {
    setTimeout(
      () => {
        location.reload();
      },1
    )
  }

  byUsernameModal(username): void {
    this.modalService.open(username, { centered: true, size: "sm"})
  }

  byEmailModal(email): void {
    this.modalService.open(email, { centered: true, size: "sm"})
  }
}


import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CinDto} from "../../../Models/reset/Dto/Cin/cin-dto";
import {MedecinService} from "../../../Services/medecinService/medecin.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Mail} from "../../../Models/reset/Dto/mail/mail";
import {Email} from "../../../Models/reset/Dto/email/email";

@Component({
  selector: 'app-medecin-reset',
  templateUrl: './medecin-reset.component.html',
  styleUrls: ['./medecin-reset.component.css']
})
export class MedecinResetComponent implements OnInit {

  resetFormCin = new FormGroup({
    cin: new FormControl(''),
  });

  resetFormEmail = new FormGroup({
    email: new FormControl(''),
  });
  cinDto: CinDto;
  emailDto: Email;
  mailDto: Mail;
  is_found = false;
  message = "";
  not_found = false;

  constructor(private medecinService: MedecinService,
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  check(): void {
    this.cinDto = this.resetFormCin.value;
    this.medecinService.check(this.cinDto)
      .subscribe(
        (response) => {
          sessionStorage.setItem("response",JSON.stringify(response));
          this.not_found = false;
          this.reload();
          this.router.navigate(['../../../user/medecin/reset-password'])
        },
        () => {
          this.not_found = true;
          this.message = " Pas de Medecin trouver avec le Cin < " + this.cinDto.cin + " > !"
        }
      )
  }

  checkEmail(): void {
    this.emailDto = this.resetFormEmail.value;
    this.medecinService.checkEmail(this.emailDto.email)
      .subscribe(
        (response) => {
          if(response != null){
            sessionStorage.setItem("response",JSON.stringify(response));
            this.is_found = true;
            this.not_found = false;
            this.resetFormCin.reset({});
            this.resetFormEmail.reset({});

            this.mailDto = new Mail(
              this.emailDto.email,
              "Lien de réinitialisation : http://localhost:4200/user/patient/reset-password",
              "Réinitialisation mon de passe");

            // send link
            this.medecinService.sendLink(this.mailDto,this.emailDto.email)
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
            this.resetFormCin.reset({});
            this.resetFormEmail.reset({});
            this.message = " Aucun médecin trouver avec cet Email ! "
          }
        },
        (error) => {
          this.is_found = false;
        }
      )
  }

  reload(): void{
    setTimeout(
      () => {
        location.reload();
      },1
    )
  }

  byUsernameModal(cin): void {
    this.modalService.open(cin, { centered: true, size: "sm"})
  }

  byEmailModal(email): void {
    this.modalService.open(email, { centered: true, size: "sm"})
  }
}

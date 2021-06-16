import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {RendezVousService} from "../../../../Services/rendezvous/rendez-vous.service";
import {PatientService} from "../../../../Services/patientService/patient.service";
import {MedecinService} from "../../../../Services/medecinService/medecin.service";
import {ToastrService} from "ngx-toastr";
import {Mail} from "../../../../Models/messagerie/mail/mail";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  mailForm = new FormGroup({
    dest: new FormControl(''),
    from: new FormControl(''),
    topic:new FormControl(''),
    body: new FormControl('')
  })

  mail: Mail;

  constructor(private formBuilder: FormBuilder,
              public rdvService: RendezVousService,
              public patientService: PatientService,
              public medecinService: MedecinService,
              private toast: ToastrService,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(" Mail - DrAvicenne ")
  }

  sendMail(): void {
    this.mail = this.mailForm.value;
    console.log(this.mail);
  }
}

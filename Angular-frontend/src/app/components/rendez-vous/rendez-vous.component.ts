import {Component, OnInit} from '@angular/core';
import {PatientService} from "../../Services/patientservice/patient.service";
import {MedecinService} from "../../Services/medecinService/medecin.service";
import {UserService} from "../../Services/userService/user.service";
import {Medecin} from "../../Models/Medecin/medecin";
import {Patient} from "../../Models/Patient/patient";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RendezVous} from "../../Models/RendezVous/rendez-vous";
import {RendezVousService} from "../../Services/rendezvous/rendez-vous.service";
import {ToastrService} from "ngx-toastr";
import {DossierMedicalService} from "../../Services/dossierService/dossier-medical.service";
import {DossierMedical} from "../../Models/DossierMedical/dossier-medical";
import {Router} from "@angular/router";
import {Mail} from "../../Models/messagerie/mail/mail";
import {MailService} from "../../Services/mailService/mail.service";
import {Horraire} from "../../Models/horraire/horraire";
import {HorraireService} from "../../Services/horraireService/horraire.service";

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css'],
})
export class RendezVousComponent implements OnInit {

  rdvForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    heure: new FormControl('', [Validators.required]),
    status: new FormControl('ATTENTE'),
  });

  medecin: Medecin;
  patient: Patient;
  rendezVous: RendezVous;
  dossier: DossierMedical;
  horraires: Horraire[] = [];
  exist = false;
  alert = false;
  medecinInfo: Medecin;
  mail: Mail;
  found: boolean = false;


  constructor(
    public patientService: PatientService,
    public medecinService: MedecinService,
    public userService: UserService,
    private rendezVousService: RendezVousService,
    private horraireService: HorraireService,
    private toast: ToastrService,
    private dossierService: DossierMedicalService,
    private mailService: MailService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.patient = JSON.parse(sessionStorage.getItem("patient"));
    this.medecinInfo = JSON.parse(sessionStorage.getItem("medecin"));
    this.getHorraire();
  }

  soumettre(): void {
    this.dossierService.findWithPatient(this.patient.username).subscribe(
      (response) => {
        this.dossier = response;
        if (this.dossier != null) {

          // Check if an existing rendez-vous has been made between both
          this.rendezVousService.findWithMedecinAndPatient(this.medecinInfo.cin, this.patient.username)
            .subscribe(
              (rendezvous: RendezVous) => {
                if(rendezvous == null){
                  this.rendezVous = this.rdvForm.value;
                  this.rendezVousService.createRendezVous(this.rdvForm.value).subscribe(
                    (response) => {
                      this.rendezVous = response;
                      // Attach rendez-vous to a patient

                      this.patientService.addRendezVous(this.patient.username, this.rendezVous.id).subscribe(
                        () => {
                          // attach medecin to rendezVous

                          this.medecinService.attachToRendezVous(this.medecinInfo.cin, this.rendezVous.id).subscribe(
                            () => {
                              this.alert = true;
                              this.setInterval();
                              this.send_notification(); // envoi du mail au médecin

                              // Give Medecin access to Dossier
                              this.dossierService.attachMedecin(this.medecinInfo.cin,this.dossier.id)
                                .subscribe(
                                  (medecin) => {
                                    this.medecin = medecin;
                                  }
                                )
                            },
                            () => {
                              this.toast.error("Erreur lors de l'assignation du dossier au médecin  !");
                            }

                          )
                        },
                        (error) => {
                          this.toast.error("Erreur lors de l'ajout du patient au rendez-vous !");
                        }
                      )
                    },
                    error => {

                    }
                  )
                }else {
                  this.toast.info(" Désoler! Vous avez dèja un rendez-vous avec ce Médecin !", "Attention !");
                }
              },
              (error) => {
                this.toast.info(" Désoler! Vous avez dèja un rendez-vous avec ce Médecin !", "Attention !");
              }
            )
        }else {
          return;
        }
      },
      (error) => {
        this.toast.error(" Veillez créer un dossier médical avant de prendre rendez-vous ! ","Dossier non trouver");
      }
    );

  }

  send_notification(): void {
    this.mail = new Mail(
      this.medecinInfo.email,
      "dravicennegroupe@gmail.com",
      "Confirmation rendez-vous",
      `${this.patient.nom} ${this.patient.prenom} vous a envoyer une demande de rendez-vous sur DrAvicenne.com `,
      );

    this.mailService.sendMail(this.mail)
      .subscribe(
        (response) => {
          console.log(response)
        },
        (error) => {
          console.log(error);
        }
      )
  }

  reload(): void {
    setTimeout(
      () => {
        window.location.reload();
      }, 5
    )
  }

  setInterval(): void {
    setInterval(
      () => {
        this.alert = false;
      }, 5000
    )
  }

  getHorraire(): void {
    this.horraireService.get(this.medecinInfo.id)
      .subscribe(
        (horraire) =>{
          sessionStorage.setItem("horraire",JSON.stringify(horraire))
          this.horraires = JSON.parse(sessionStorage.getItem("horraire"));
        }
      )
  }
}

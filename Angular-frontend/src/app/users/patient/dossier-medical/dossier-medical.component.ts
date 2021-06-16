import { DossierMedical } from '../../../Models/DossierMedical/dossier-medical';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Patient } from 'src/app/Models/Patient/patient';
import { PatientService } from 'src/app/Services/patientService/patient.service';
import { DossierMedicalService } from 'src/app/Services/dossierService/dossier-medical.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Tab } from 'src/app/Models/tab';
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {MedecinService} from "../../../Services/medecinService/medecin.service";
import {Title} from "@angular/platform-browser";
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-dossier-medical',
  templateUrl: './dossier-medical.component.html',
  styleUrls: ['./dossier-medical.component.css']
})
export class DossierMedicalComponent implements OnInit {

  @ViewChild('content') content: ElementRef;
  patient: Patient = JSON.parse(sessionStorage.getItem("patient"))
  dossier: DossierMedical = null;
  dossierPdf: any;
  numero = this.getRandomInt(1000000);
  exist: boolean = false;
  checked: boolean = false;
  Tab: Tab = null;

  antMed = new FormGroup({
    allergie: new FormControl('', [Validators.required]),
    diabete: new FormControl('', [Validators.required]),
    hypertension: new FormControl('', [Validators.required]),
    asthme: new FormControl('', [Validators.required]),
    autres: new FormControl('', [Validators.required]),
  })

  antCh = new FormGroup({
    operationAnt: new FormControl('', [Validators.required]),
    traumatismeAnt: new FormControl('', [Validators.required]),
    autres: new FormControl('', [Validators.required]),
  })

  antGyn = new FormGroup({
    nombreGrossesse: new FormControl(''),
    nombreEnfant: new FormControl(''),
    cesarienne: new FormControl(''),
    autres: new FormControl(''),
  })

  dossierForm = new FormGroup({
    numero: new FormControl(this.numero),
    antMed: new FormControl(this.antMed.value),
    andCh: new FormControl(this.antCh.value),
    andGyn: new FormControl(this.antGyn.value)
  });

  constructor(public patientService: PatientService,
              public dossierService: DossierMedicalService,
              public medecinService: MedecinService,
              private route: Router,
              private toast: ToastrService,
              private title: Title) { }

  ngOnInit(): void {
    this.findWithPatient();
  }

  findWithPatient(): void {
    this.dossierService.findWithPatient(this.patient.username).subscribe(
      (response) => {
        this.dossier = response;
        if(this.dossier == null){
          this.exist = false
        }else{
          this.exist = true;
        }
      },
      (error) => {
        console.log(" Error : " + error.message);
      }
    )
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  createDossier(): void {

    this.dossierForm = new FormGroup({
      numero: new FormControl(this.numero),
      antMed: new FormControl(this.antMed.value),
      antCh: new FormControl(this.antCh.value),
    });

    this.dossier = this.dossierForm.value;
    this.dossierService.addDossier(this.dossier).subscribe(
      response => {
        this.Tab = response;

        // Annexing dossier to patient

        this.dossierService.attachPatient(this.patient.username, this.Tab.id).subscribe(
          result => {
            this.toast.success(" Votre dossier à été créer !", "Nouveau dossier");
            this.ngOnInit();

            // redirecting to user profile
            this.route.navigate([`pat/dashboard`]);
          },
          error => {
            this.toast.error("Une erreur est survenu lors de la creation de votre Dossier","" + error.type);
          });
      },
      (error: HttpErrorResponse) => {
        this.toast.error("Une erreur est survenue : " + error.message);
      });
  }

  download() : void {
    let data  = this.content.nativeElement;
    let options : any = {
      orientation: 'p',
      unit: 'px',
      format: 'a4',
    };
    let doc = new jsPDF(options);
    doc.html(data.innerHTML, {
      callback: function (doc) {
        doc.save("dossier.pdf")
      },
      margin: 15,
      x: 10,
      y: 10
    });
  }

  delete(): void {
    this.patientService.deleteFromDossier(this.dossier.id)
      .subscribe(
        (patient) =>{
          this.ngOnInit();
          this.reload();
        }
      )
  }

  reload(): void {
    setTimeout(
      () => {
        location.reload();
      }, 2
    )
  }
}

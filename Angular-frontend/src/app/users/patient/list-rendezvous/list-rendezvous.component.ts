import { Component, OnInit } from '@angular/core';
import {PatientService} from "../../../Services/patientservice/patient.service";
import {RendezVousService} from "../../../Services/rendezvous/rendez-vous.service";
import {MedecinService} from "../../../Services/medecinService/medecin.service";
import {Title} from "@angular/platform-browser";
import {Patient} from "../../../Models/Patient/patient";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-list-rendezvous',
  templateUrl: './list-rendezvous.component.html',
  styleUrls: ['./list-rendezvous.component.css'],
  styles: [`
    .dark-modal .modal-content {
      background-color: transparent;
      opacity: 0.9;
      color: white;
    }
    .modal-xl .modal-lg {
      max-width: 550px;
    }
  `]

})
export class ListRendezvousComponent implements OnInit {

  patientInfo: Patient = JSON.parse(sessionStorage.getItem("patient"));
  handler:any = null;
  name: string = '';

  accepted: [] = null;
  isAccepted: boolean = false

  inWait: [] = null;
  isInWait: boolean = false;

  denied: [] = null;
  isDenied: boolean = false;

  canceled: [] = null;
  isCanceled: boolean = false;
  message: string;

  constructor(public patientService: PatientService,
              private rdvService: RendezVousService,
              private medecinService: MedecinService,
              private modalService: NgbModal,
              private title: Title) {}

   ngOnInit(): void {
     this.title.setTitle(" Liste Rendez-vous - DrAvicenne")
     this.loadStripe();
    this.rdvService.p_notifications = 0;
    this.rdvService.pr_note = 0;
    this.rdvService.pw_note = 0;
    this.rdvService.pa_note = 0;

    this.rdvService.m_notifications = 0;
    this.rdvService.ma_note = 0;
    this.rdvService.mw_note = 0;

    this.acceptedRdv();
    this.inWaitRdv();
    this.deniedRdv();
    this.canceledRdv();
  }

  acceptedRdv(): void{
    this.rdvService.findByStatus("ACCEPTER",this.patientInfo.username).subscribe(
      (response) => {
        this.accepted = response;
        this.rdvService.p_notifications += this.accepted.length; // total notifications
        this.rdvService.pa_note = this.accepted.length; // total rdv attente notifications

        if(this.accepted.length == 0){
          this.isAccepted = false;
        }else{
          this.isAccepted = true;
        }
      },
      (error) => {
        this.message = " Error " + error.message;
      }
    )
  }

  inWaitRdv(): void {
    this.rdvService.findByStatus("ATTENTE",this.patientInfo.username).subscribe(
      (response) => {
        this.inWait = response;
        this.rdvService.p_notifications += this.inWait.length;
        this.rdvService.pw_note = this.inWait.length;

        if(this.inWait.length == 0){
          this.isInWait = false;
        }else{
          this.isInWait = true;
        }
      },
      (error) => {
        this.message = " Error " + error.message;
      }
    )
  }

  deniedRdv(): void {
    this.rdvService.findByStatus("REFUSER",this.patientInfo.username).subscribe(
      (response) => {
        this.denied = response;
        this.rdvService.p_notifications += this.denied.length;
        this.rdvService.pr_note = this.denied.length;

        if(this.denied.length == 0){
          this.isDenied = false;
        }else{
          this.isDenied = true;
        }
      },
      (error) => {
        this.message = " Error " + error.message;
      }
    )
  }

  canceledRdv(): void{
    this.rdvService.findByStatus("ANNULER",this.patientInfo.username).subscribe(
      (response) =>{
        this.canceled = response;
        if(this.canceled.length == 0){
          this.isCanceled = false;
        }else{
          this.isCanceled = true;
        }
      }
    )
  }

  // Operations

  cancelRdv(id_rdv):void{
    this.rdvService.deleteRdv(id_rdv)
      .subscribe(
        () => {
          this.ngOnInit();
        }
      )
  }

  deleteRdv(id_rdv): void{
    this.rdvService.deleteRdv(id_rdv)
      .subscribe(
        () => {
          this.ngOnInit();
        }
      )
  }

  pay(amount: any) {
    let handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
      locale: 'auto',
      token: function (token: any) {
        console.log(token)
        alert('Paiement effectuer avec suucès !/');
      }
    });

    handler.open({
      name: 'Paiement consultation',
      description: 'Cabinet de Médecins ',
      amount: amount * 100
    });
  }

  loadStripe() {

    if(!window.document.getElementById('stripe-script')) {
      let s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51IxCsxA1axM7RFxG47LDDTV9IaZM7509N5EKLD2W8kKZInFcPyenVzjlOXIbBOwba5NSnPFFRwV8IfL3SLvO1C5K00BbMpYAn3',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert(' Paiement effectuer avec succès !!');
          }
        });
      }

      window.document.body.appendChild(s);
    }
  }

  openPaymentModal(payment){
    this.modalService.open(payment, { windowClass: 'dark-modal', centered: true, size: "md"})
  }
}

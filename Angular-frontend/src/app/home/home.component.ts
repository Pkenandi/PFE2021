import { Component, OnInit } from '@angular/core';
import {QR} from "../Models/QR/qr";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images = [
    { path: 'assets/images/medicals/teleC.jpg'},
    { path: 'assets/images/medicals/teleM.png'},
    { path: 'assets/images/medicals/teleC2.jpg'},
    { path: 'assets/images/medicals/teleEx.jpeg'},
    { path: 'assets/images/medicals/img4.jpg'},
    { path: 'assets/images/medicals/img5.jpg'},
    { path: 'assets/images/medicals/teleC3.jpg'},
    { path: 'assets/images/medicals/img6.jpg'},
    { path: 'assets/images/medicals/teleM1.webp'},
    { path: 'assets/images/medicals/img7.jpg'},
    { path: 'assets/images/medicals/img2.jpg'},
    { path: 'assets/images/medicals/img8.jpg'},
    { path: 'assets/images/medicals/img9.jpg'},
    { path: 'assets/images/medicals/teleEx.jpeg'},

  ];
  Qr: QR[] = [];

  constructor(private toast: ToastrService) { }

  ngOnInit(): void {
    this.Qr = [
      new QR(" J'arrive pas à prendre rendez-vous. Comment faire ?","Vous devez avant tout créer votre compte et vous connectez !"),
      new QR(" Que faire si on presente des symptomes du virus ?"," Appeler votre médecin et surtout ne vous rendez pas aux urgence"),
      new QR(" A quel age précisement peut-on contracter la diabete ?","Il se manifeste généralement à l'âge adulte, chez les individus de 40 ans et plus.  !"),
      new QR(" Quels médicaments faut-il éviter, si on a la Covid-19 ?","Vous devez absolument éviter les anti-inflammatoire non stéroïdien, hydroxychloroquine, azythromicine !"),
      new QR(" Le paludisme est-il une maladie contagieuse ?","Non. Le paludisme ne se répand pas d'une personne à une autre comme le rhume ou la grippe ; par ailleurs, il n'est pas sexuellement transmissible."),
      new QR(" Quelle est la différence entre un virus et une bactérie ?"," Les bactéries sont de petits organismes, mais les virus sont généralement bien plus petits."),
      new QR(" C'est quoi un virus pathogène ?","Aptitude d'un germe à provoquer une maladie dans un organisme réceptif. Certains virus peuvent être obtenus à un état de pureté très avancée."),
      new QR(" Comment eviter le cancer ? "," Cessez de fumer, Protégez votre peau du soleil, Évitez le surpoids, Soyez actif 30 minutes par jour, Réduisez votre consommation de viandes rouges. ...")
    ]


  }

  onClick(): void{
    this.toast.info("Connectez-vous pour prendre Rendez-vous");
  }
}

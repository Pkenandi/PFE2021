import { Component, OnInit } from '@angular/core';
import {QR} from "../Models/QR/qr";
import {ToastrService} from "ngx-toastr";
import {Caroussel} from "../Models/QR/data";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images = [
    { path: 'assets/images/medicals/T1.jpg'},
    { path: 'assets/images/medicals/teleM.png'},
    { path: 'assets/images/medicals/teleC2.jpg'},
    { path: 'assets/images/medicals/teleEx.jpeg'},
    { path: 'assets/images/medicals/T2.png'},
    { path: 'assets/images/medicals/teleC3.jpg'},
    { path: 'assets/images/medicals/T3.jpg'},
    { path: 'assets/images/medicals/teleM1.webp'},
    { path: 'assets/images/medicals/img2.jpg'},
    { path: 'assets/images/medicals/img8.jpg'},
    { path: 'assets/images/medicals/teleEx.jpeg'},

  ];
  Qr: QR[] = [];
  Data: Caroussel[] = null;

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
    ];
    this.Data = [
      { image: "assets/images/home/conseil.png", title: " 5 Conseils Médicaux pour vivre longtemps dans la vie.", description: "  "},
      { image: "assets/images/home/eat.png", title: "Manger des fruits et des légumes " ,description: " Une alimentation saine, composée de cinq fruits ou légumes par jour est essentielle pour rester en bonne santé."},
      { image: "assets/images/home/sport.png", title: "Faire 30 minutes d'activité sportive par jour" ,description: " Quelques promenades de dix minutes suffisent si vous n'êtes pas un grand sportif."},
      { image: "assets/images/home/sleep.png", title: "Dormir 7 à 8 heures par nuit" ,description: " Le manque de sommeil chez un adulte ou un enfant augmente le risque de maladies cardiaques, de cancer et de diverses pathologies. "},
      { image: "assets/images/home/smoke.png", title: "Ne pas fumer" ,description: " Sans surprise, pour vivre longtemps et en bonne santé, la cigarette est à proscrire absolument : fumer un paquet par jour (soit environ 20 cigarettes) diminuerait l'espérance de vie de 7 ans en moyenne. Une bonne nouvelle quand même pour les fumeurs : dire « adieu » au tabac permettrait de regagner progressivement les années perdues."},
      { image: "assets/images/home/weight.png", title: "Contrôler son poids et éviter les excès " ,description: " Les maladies chroniques (diabète, cholestérol, troubles cardiovasculaires, surpoids...) diminueraient drastiquement l'espérance de vie. De plus, chaque point d'IMC supérieur à la normale (au-dessus de 25, donc) amputerait l'espérance de vie de 7 mois environ."},
    ]
  }

  onClick(): void{
    this.toast.info("Connectez-vous pour prendre Rendez-vous");
  }
}

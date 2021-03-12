import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Specialite} from "../../../Models/spacialite/specialite";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrls: ['./specialite.component.css']
})
export class SpecialiteComponent implements OnInit {

  specialiteForm = new FormGroup({
    specialite: new FormControl(''),
    description: new FormControl(''),
  });

  specialite:Specialite = null;

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(" Specialite - DrAvicenne ")
  }

  add(): void{
    this.specialite = this.specialiteForm.value;
    console.log(" Autre specialité : " ,this.specialite);
  }
}

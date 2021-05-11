import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  message = "";
  clicked: boolean = false;

  constructor( private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Mon compte - DrAvicenne")
  }

  setTitle(title: string): void {
    this.title.setTitle(title + " - DrAvicenne");
  }

}

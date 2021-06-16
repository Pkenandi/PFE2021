import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/angular";
import {ToastrService} from "ngx-toastr";
import {Tache} from "../../Models/tache/tache";
import {TacheService} from "../../Services/tacheService/tache.service";
import {FormControl, FormGroup} from "@angular/forms";
import Try from "../../Models/Try";
import {HttpClient} from "@angular/common/http";
import {mainUrl} from "../../../environments/environment";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  Date = new FormGroup({
    title: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
  });

  tacheList: Object[] = [];
  tache: any;
  list = this.tacheList

  constructor(private tacheService: TacheService,
              private http: HttpClient) {
  }

  send(): void {
    this.tache = this.Date.value;
    this.http.post(`${mainUrl}try`,this.tache)
      .subscribe(
        (success) => {
          this.tache = success;
        },
        error => {
          console.log(" Erreurs :");
        }
      )
  }

  Get(): void{
    this.http.get<Object[]>(`${mainUrl}try`)
      .subscribe(
        (success) => {
          this.tacheList = success;
        }
      )
  }

  // setView: View = 'Month';
  // setDate: Date = new Date(2021, 6,4);
  // eventObject: EventSettingsModel = {
  //   dataSource: [{
  //     StartTime: new Date(2021,6,4,5,20),
  //     EndTime: new Date(2021,6,4,10,30),
  //     Subject: 'Rendez-vous !'
  //   }]
  // }


  ngOnInit(): void {
    this.Get();
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [
      this.tacheList
    ]

  };

}

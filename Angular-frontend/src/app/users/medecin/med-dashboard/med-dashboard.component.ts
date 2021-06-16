import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { UserService } from 'src/app/Services/userService/user.service';
import {MedecinService} from "../../../Services/medecinService/medecin.service";
import {Title} from "@angular/platform-browser";
import {Medecin} from "../../../Models/Medecin/medecin";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {saveAs} from "file-saver";
import {FileService} from "../../../Services/fileService/file.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RendezVousService} from "../../../Services/rendezvous/rendez-vous.service";

@Component({
  selector: 'app-med-dashboard',
  templateUrl: './med-dashboard.component.html',
  styleUrls: ['./med-dashboard.component.css']
})
export class MedDashboardComponent implements OnInit {

  medecinInfo: Medecin;
  picture: string;
  filenames: string[] = [];
  message = '';
  validity = true;
  show = false
  fileStatus = {
    status: '',
    requestType: '',
    percent: 0
  };
  formData = new FormData();

  constructor(public medecinService: MedecinService,
              private fileService: FileService,
              public rdvService: RendezVousService,
              private modalService: NgbModal,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(" Tableau de bord - DrAvicenne ")
    this.medecinInfo = JSON.parse(sessionStorage.getItem("medecin"));
    this.medecinService.getMedecinByCin(this.medecinInfo.cin)
      .subscribe(
        (results) => {
          sessionStorage.setItem("medecin", JSON.stringify(results));
          this.medecinInfo = results;
          this.asCredentials();
        }
      )
      //Toggle Click Function
    $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    });
  }

  setTitle(title: string): void{
    this.title.setTitle(title + " - DrAvicenne ")
  }
  // Profile Pic
  onUploadFile(files: File[]): void {
    if(files[0].type === 'image/jpeg' || files[0].type === 'image/png' || files[0].type === 'image/gif'){
      this.validity = true;
      this.show = true;
      for (const file of files) {
        this.formData.append('files', file, file.name);
      }

    }else{
      this.validity = false;
      this.show = false;
      this.message = " Format non autorisé !!!"
    }
  }

  setPicture(): void {
    this.fileService.setMedecinPic(this.formData, this.medecinInfo.cin)
      .subscribe(
        (event) => {
          console.log(event);
          this.reportProgress(event);

        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
  }

  removePicture(): void {
    this.fileService.removePictureMedecin(this.medecinInfo.cin)
      .subscribe(
        (response) => {
          this.reload();
        },
        (error: HttpErrorResponse) => {
          this.reload();
        }
      );
  }

  private reportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading...')
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading...')
        break;
      case HttpEventType.ResponseHeader:
        console.log(' Header returned ', httpEvent);
        break;
      case HttpEventType.Response:
        if(httpEvent.body instanceof Array){
          for(const filename of httpEvent.body){
            this.filenames.unshift(filename)
          }
          sessionStorage.setItem("pic",JSON.stringify(this.filenames))
          console.log(this.filenames);
        }else{
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
            {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
        }
        this.fileStatus.status = 'done';
        break;
      default:
        console.log(httpEvent);
        break;
    }
  }

  private updateStatus(loaded: number, total: number, requestType: string) {
    this.fileStatus.status = 'progress'
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total)
  }

  setProfileModal(profile): void {
    this.modalService.open(profile, {centered: true, size: "sm"})
  }

  asCredentials(): void {
    this.medecinService.credentials = this.medecinInfo.picture !== null;
  }

  reload(): void {
    setTimeout(
      () => {
        window.location.reload();
      }, 1
    )
  }
}

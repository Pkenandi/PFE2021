import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery'
import {PatientService} from 'src/app/Services/patientservice/patient.service';
import {UserService} from 'src/app/Services/userService/user.service';
import {Title} from "@angular/platform-browser";
import {Patient} from "../../../Models/Patient/patient";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {saveAs} from "file-saver";
import {FileService} from "../../../Services/fileService/file.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-pat-dashboard',
  templateUrl: './pat-dashboard.component.html',
  styleUrls: ['./pat-dashboard.component.css']
})
export class PatDashboardComponent implements OnInit {

  dropdown = document.getElementsByClassName("dropdown-btn");
  patientInfo: Patient;
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

  constructor(public _service: UserService,
              public patientService: PatientService,
              private fileService: FileService,
              private modalService: NgbModal,
              private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle(" Tableau de bord - DrAvicenne")
    this.patientInfo = JSON.parse(sessionStorage.getItem("patient"));

    this.patientService.getByUsername(this.patientInfo.username)
      .subscribe(
        (results) => {
          sessionStorage.setItem("patient",JSON.stringify(results))
          this.patientInfo = JSON.parse(sessionStorage.getItem("patient"));
        }
      )

    this.asCredentials();

    // Toggle Click Function
    $('#menu-toggle').click(function (e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });

    // side menu
    for (let i = 0; i < this.dropdown.length; i++) {
      (this.dropdown)[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }
  }

  setTitle(title): void {
    this.title.setTitle(title + ' - DrAvicenne ');
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
    this.fileService.setPatientPic(this.formData, this.patientInfo.username)
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
    this.patientService.credentials = this.patientInfo.picture !== '';
  }

  reload(): void {
    setTimeout(
      () => {
        location.reload();
      }, 1
    )
  }

}

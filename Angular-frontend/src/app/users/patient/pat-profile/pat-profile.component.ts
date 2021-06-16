import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Patient} from 'src/app/Models/Patient/patient';
import {PatientService} from 'src/app/Services/patientService/patient.service';
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import {FileService} from "../../../Services/fileService/file.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-pat-profile',
  templateUrl: './pat-profile.component.html',
  styleUrls: ['./pat-profile.component.css']
})
export class PatProfileComponent implements OnInit {

  updateForm = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    age: new FormControl(''),
    ville: new FormControl(''),
    email: new FormControl(''),
    groupeSang: new FormControl(''),
    phone: new FormControl(''),
    dateNaiss: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    cpassword: new FormControl('')
  });
  profileInfo: Patient = JSON.parse(sessionStorage.getItem("patient"));
  UpdatedDetails: Patient;
  date = new Date();
  filenames: string[] = [];
  message = '';
  validity = true;
  show = false
  picture: string = '';
  fileStatus = {
    status: '',
    requestType: '',
    percent: 0
  };
  formData = new FormData();

  constructor(public patientService: PatientService,
              private route: ActivatedRoute,
              private toaster: ToastrService,
              private fileService: FileService,
              private modalService: NgbModal,
              private title: Title) {
  }


  ngOnInit(): void {
    this.title.setTitle(" Profile - DrAvicenne ")
    this.patientService.getByUsername(this.route.snapshot.params.username).subscribe(
      results => {
        this.updateForm = new FormGroup({
          nom: new FormControl(results['nom']),
          prenom: new FormControl(results['prenom']),
          age: new FormControl(results['age']),
          dateNaiss: new FormControl(results['dateNaiss']),
          groupeSang: new FormControl(results['groupeSang']),
          ville: new FormControl(results['ville']),
          phone: new FormControl(results['phone']),
          email: new FormControl(results['email']),
          username: new FormControl(results['username']),
          password: new FormControl(results['password']),
          cpassword: new FormControl(results['cpassword']),
        });
        this.picture = results['picture'];
        sessionStorage.setItem("patient", JSON.stringify(results));
      }
    )

    this.asCredentials();
  }

  UpdatePatient(): void {
    this.UpdatedDetails = this.updateForm.value;

    this.patientService.updatePatient(this.UpdatedDetails, this.route.snapshot.params.username)
      .subscribe(
        (response) => {
          this.profileInfo = response;
          this.toaster.success(
            "Vos informations ont étaient modifiées le \n"
            + this.date.getDate()
            + "-" + this.date.getMonth()
            + "-" + this.date.getFullYear(),
            "Modification");
          //this.ngOnInit();
          this.form(response)
        },
        (error: HttpErrorResponse) => {
          this.toaster.error(
            "Désoler, impossible de modifier vos informations !! \n",
            " => " + error.type);
        });
  }

  form(response: any): void {
    this.updateForm = new FormGroup({
      nom: new FormControl(response['nom']),
      prenom: new FormControl(response['prenom']),
      age: new FormControl(response['age']),
      dateNaiss: new FormControl(response['dateNaiss']),
      groupeSang: new FormControl(response['groupeSang']),
      ville: new FormControl(response['ville']),
      phone: new FormControl(response['phone']),
      email: new FormControl(response['email']),
      username: new FormControl(response['username']),
      password: new FormControl(response['password']),
      cpassword: new FormControl(response['cpassword']),
    });
  }

  // Profile Pic
  onUploadFile(files: File[]): void {
    if (files[0].type === 'image/jpeg' || files[0].type === 'image/png' || files[0].type === 'image/gif') {
      this.validity = true;
      this.show = true;
      for (const file of files) {
        this.formData.append('files', file, file.name);
      }

    } else {
      this.validity = false;
      this.show = false;
      this.message = " Format non autorisé !!!"
    }
  }

  setPicture(): void {
    this.fileService.setPatientPic(this.formData, this.profileInfo.username)
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
        if (httpEvent.body instanceof Array) {
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename)
          }
          sessionStorage.setItem("pic", JSON.stringify(this.filenames))
          console.log(this.filenames);
        } else {
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

  asCredentials(): void {
    this.patientService.credentials = this.picture !== '';
  }

  setProfileModal(profile): void {
    this.modalService.open(profile, {centered: true, size: "sm"})
  }

  reload(): void {
    setTimeout(
      () => {
        location.reload();
      }, 1
    )
  }
}

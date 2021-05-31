import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Medecin} from 'src/app/Models/Medecin/medecin';
import {MedecinService} from 'src/app/Services/medecinService/medecin.service';
import {FormControl, FormGroup} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {SpecialiteService} from "../../../Services/specialiteService/specialite.service";
import {Specialite} from "../../../Models/spacialite/specialite";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {saveAs} from "file-saver";
import {FileService} from "../../../Services/fileService/file.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-med-profile',
  templateUrl: './med-profile.component.html',
  styleUrls: ['./med-profile.component.css']
})
export class MedProfileComponent implements OnInit, OnDestroy {

  cin: string = null;
  private sub: Subscription;
  medecin: Medecin = null;
  specialite: Specialite[];
  med = JSON.parse(sessionStorage.getItem("medecin"));
  date = new Date();
  filenames: string[] = [];
  message = '';
  validity = true;
  show = false
  picture: string;
  fileStatus = {
    status: '',
    requestType: '',
    percent: 0
  };
  formData = new FormData();

  medecinInfo = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    cin: new FormControl(''),
    specialite: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
    ville: new FormControl(''),
  })

  constructor(
    public medService: MedecinService,
    private specialiteService: SpecialiteService,
    private fileService: FileService,
    private modalService: NgbModal,
    public activatedRoute: ActivatedRoute,
    private toaster: ToastrService,
    private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle(" Profile - DrAvicenne ")
    this.sub = this.activatedRoute.params.subscribe(
      params => {
        this.cin = params['cin'];

        this.medService.getMedecinByCin(this.cin).pipe(
          map((medecin: Medecin) => this.medecin = medecin))
          .subscribe(
            result => {
              this.medecin = result;
              this.medecinInfo = new FormGroup({
                nom: new FormControl(result['nom']),
                prenom: new FormControl(result['prenom']),
                cin: new FormControl(result['cin']),
                specialite: new FormControl(result['specialite']),
                email: new FormControl(result['email']),
                phone: new FormControl(result['phone']),
                password: new FormControl(result['password']),
                ville: new FormControl(result['ville']),
              })
            }
          );

        // get all specialities
        this.specialiteService.getWithMedecin(this.med.id)
          .subscribe(
            (specialities) =>{
              this.specialite = specialities;
            },
            (error) => {
              console.log(error);
            }
          )
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateMedecin(): void {
    this.medecin = this.medecinInfo.value;

    this.medService.update(this.medecin, this.activatedRoute.snapshot.params.cin)
      .subscribe(
        result => {
          sessionStorage.removeItem("medecin");
          sessionStorage.setItem("medecin", JSON.stringify(result));
          this.medecin = JSON.parse(sessionStorage.getItem("medecin"));

          this.toaster.success(
            "Vos informations ont étaient modifiées le \n"
            + this.date.getDate()
            + "-" + this.date.getMonth()
            + "-" + this.date.getFullYear(),
            "Modification");
        },
        error => {
          this.toaster.error("Désoler, impossible de modifier vos informations !!", "Echec de modification");
        }
      )
  }

  // set profile pic
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
    this.fileService.setMedecinPic(this.formData, this.medecin.cin)
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

  reload(): void {
    setTimeout(
      () => {
        location.reload();
      },1
    )
  }
}

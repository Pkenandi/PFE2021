import {Component, OnInit} from '@angular/core';
import {FileService} from "../../Services/fileService/file.service";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import { saveAs } from "file-saver";

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {
  filenames: string[] = [];
  message = '';
  validity = true;
  fileStatus = {
    status: '',
    requestType: '',
    percent: 0
  };
  profile

  constructor(private fileService: FileService) {
  }

  ngOnInit(): void {
    this.filenames = JSON.parse(sessionStorage.getItem("files"));
  }

  onUploadFile(files: File[]): void {
    const formData = new FormData();
    if(files[0].type === 'image/jpeg' || files[0].type === 'image/png' || files[0].type === 'image/gif'){
      this.validity = true;
      for (const file of files) {
        formData.append('files', file, file.name);
      }
    }else{
      this.validity = false;
      this.message = " Format non autorisé !!!"
    }
  }

  onDownloadFile(filename: string): void {
    this.fileService.download(filename)
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
          sessionStorage.setItem("files",JSON.stringify(this.filenames))
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
}

import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import {ConfirmComponent} from "../../components/confirm/confirm.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg) {
    return this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: {
        message: msg,
      }
    })
  }
}

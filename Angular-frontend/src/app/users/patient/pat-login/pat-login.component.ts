import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-pat-login',
  templateUrl: './pat-login.component.html',
  styleUrls: ['./pat-login.component.css']
})
export class PatLoginComponent implements OnInit {

  logData: any;
  message = '';

  patLogForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private service: UserService, private _router: Router) { }

  ngOnInit(): void {
  }

  login(): void
  {
    this.logData = this.patLogForm.value;
    console.log(this.logData);
    this.service.loginPatient(this.logData.username, this.logData.password)
      .subscribe(response => {
        this.patLogForm.reset({});
        this.service.isAuthenticated = true;
        this.username = this.logData.username;
        this._router.navigate(['../pat/dashboard']);
      },
      (error: HttpErrorResponse) => {
        this.message = 'User not found !';
        this.patLogForm.reset({});
      });
  }

  get username(): any
  { return this.patLogForm.get('username'); }

}

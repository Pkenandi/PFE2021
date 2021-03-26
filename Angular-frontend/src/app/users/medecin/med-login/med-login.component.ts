import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-med-login',
  templateUrl: './med-login.component.html',
  styleUrls: ['./med-login.component.css']
})
export class MedLoginComponent implements OnInit {

  logData: any;
  message = '';

  medLogForm = new FormGroup({
    cin: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private service: UserService, private _router: Router) { }

  ngOnInit(): void {
  }

  login(): void
  {
    this.logData = this.medLogForm.value;
    console.log(this.logData);
    this.service.loginMedecin(this.logData.cin, this.logData.password)
        .subscribe(
          response => {
            console.log(response);
            this.medLogForm.reset({});
            this.service.isAuthenticated = true;
            this._router.navigate(['../med/dashboard']);
          },
          error => {
            this.message = ' User not found';
            this.medLogForm.reset({});
          })
  }

}

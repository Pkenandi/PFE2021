import { UserService } from './../../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/Models/User/user';
import { Medecin } from 'src/app/Models/Medecin/medecin';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-med-register',
  templateUrl: './med-register.component.html',
  styleUrls: ['./med-register.component.css']
})
export class MedRegisterComponent implements OnInit {

  regMedForm = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    specialite: new FormControl(''),
    ville: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    cin: new FormControl(''),
    password: new FormControl(''),
    cpassword: new FormControl('')
  });

  medecins: Medecin[];

  constructor(private service: UserService, private _router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  registerMedecin()
  {
    this.medecins = this.regMedForm.value;
    console.log('Medecin :', this.medecins);
    this.service.registerMedecin(this.regMedForm.value).subscribe(() => {
      this.service.isAuthenticated = true;
      this.regMedForm.reset({});
      this._router.navigate(['../med/dashboard']);
    }, (error: HttpErrorResponse) => {
      console.log(error.message);
    });
  }

}

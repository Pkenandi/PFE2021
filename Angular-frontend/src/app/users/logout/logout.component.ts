import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/userService/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _service: UserService, private _router: Router) { }

  ngOnInit(): void {
    this._service.logOut();
    this._router.navigate(['mon-compte']);
  }

}

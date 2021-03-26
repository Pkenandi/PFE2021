import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username = '';

  isAuthenticated = false;
  constructor(public service: UserService) { }

  ngOnInit(): void {
  }

 username = this.service.username;
 
}

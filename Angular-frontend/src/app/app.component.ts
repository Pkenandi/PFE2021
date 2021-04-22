import { UserService } from 'src/app/Services/userService/user.service';
import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './Services/web/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Angular-frontend';

  constructor(public user: UserService, private webSocket: WebSocketService){}

  ngOnInit(): void {
    this.webSocket.openWebSocket();
  }


}

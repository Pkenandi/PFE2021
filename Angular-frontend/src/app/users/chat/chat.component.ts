import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Chat } from 'src/app/Models/chat/chat';
import { UserService } from 'src/app/Services/user.service';
import { WebSocketService } from 'src/app/Services/web/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  sendForm = new FormGroup({
    username: new FormControl(this.userService.Username),
    message: new FormControl(''),
  });

  constructor(public webSocket: WebSocketService, public userService: UserService) { }

  ngOnInit(): void {
    this.sendForm = new FormGroup({
      username: new FormControl(this.userService.Username),
      message: new FormControl(''),
    });
  }


  public sendMessage(): void{

    const chatMessage = new Chat(this.sendForm.value.username, this.sendForm.value.message);
    this.webSocket.sendMessage(chatMessage);
    this.sendForm.controls.message.reset();
  }
}

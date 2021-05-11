import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Chat } from 'src/app/Models/chat/chat';
import { UserService } from 'src/app/Services/userService/user.service';
import { WebSocketService } from 'src/app/Services/webrtcService/web-socket.service';
import {Title} from "@angular/platform-browser";
import {Patient} from "../../Models/Patient/patient";
import {Medecin} from "../../Models/Medecin/medecin";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  patientInfo: Patient = JSON.parse(sessionStorage.getItem("patient"));
  medecinInfo: Medecin = JSON.parse(sessionStorage.getItem("medecin"));

  sendForm = new FormGroup({
    username: new FormControl(this.userService.Username),
    message: new FormControl(''),
  });

  constructor(public webSocket: WebSocketService,
              public userService: UserService,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(" Chat - DrAvicenne ")
    this.sendForm = new FormGroup({
      username: new FormControl(this.patientInfo.username),
      message: new FormControl(''),
    });
  }

  public sendMessage(): void{
    const chatMessage = new Chat(this.sendForm.value.username, this.sendForm.value.message);
    this.webSocket.sendMessage(chatMessage);
    this.sendForm.controls.message.reset();
  }
}

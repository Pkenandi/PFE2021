import { Injectable } from '@angular/core';
import { Chat } from 'src/app/Models/chat/chat';
import { webUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket: WebSocket;
  chatMessages: Chat[] = [];

  constructor() { }

  public openWebSocket(){
    this.webSocket = new WebSocket(webUrl);

    this.webSocket.onopen = (event) =>{
      console.log(' Open : ', event);
    };

    this.webSocket.onmessage =(event) => {
      const chatMessage = JSON.parse(event.data);
      this.chatMessages.push(chatMessage);
    };

    this.webSocket.onclose = (event) => {
      console.log(' Closed : ', event);
    };
  }

  public sendMessage( chatMessage: Chat){
    this.webSocket.send(JSON.stringify(chatMessage));
  }

  public closeWebSocket(){
    this.webSocket.close();
  }

}

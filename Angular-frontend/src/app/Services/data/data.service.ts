import { Injectable } from '@angular/core';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {Message} from '../../Models/message/message';
import {Subject} from 'rxjs';
import {webSocket} from 'rxjs/webSocket';
import {videoUrl} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private socket$: WebSocketSubject<Message>;
  private messagesSubject = new Subject<Message>();
  public messages$ = this.messagesSubject.asObservable();
  constructor() { }

  public connect(): void{
    this.socket$ = this.getNewWebSocket();

    this.socket$.subscribe(
      msg => {
        console.log(' Received message of type : ' + msg.type);
        this.messagesSubject.next(msg);
      }
    );
  }

   sendMessage(msg: Message): void {
    console.log(' Sending message:  ' + msg.type);
    this.socket$.next(msg);
   }

  private getNewWebSocket(): WebSocketSubject<any> {
    return webSocket({
      url: videoUrl,
      openObserver : {
        next: () => {
          console.log(' DataService: connection OK');
        }
      },
      closeObserver: {
        next: () => {
          console.log(' DataService: connection close !');
          this.socket$ = undefined;
          this.connect();
        }
      }
    });
  }
}

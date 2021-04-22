import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../Services/data/data.service';
import {UserService} from "../../Services/userService/user.service";
import {Event} from "@angular/router";
import {Message} from "../../Models/message/message";

const mediaConstraints = {
  audio: true,
  video: {width: 720, height: 540}
};

const offerOptions = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true,
}

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})

export class VideoComponent implements AfterViewInit {

  private localStream: MediaStream;
  @ViewChild('local_video') localVideo: ElementRef;
  @ViewChild('received_video') remoteVideo: ElementRef;
  private peerConnection: RTCPeerConnection;

  constructor(public dataService: DataService, public userService: UserService) {
  }

  ngAfterViewInit(): void {
    this.addIncomingMessageHandler();
    this.requestMediasDevices();
  }

  private async requestMediasDevices(): Promise<void> {
    this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    this.localVideo.nativeElement.srcObject = this.localStream;
    this.pauseLocalVideo();
  }

  pauseLocalVideo(): void {
    this.localStream.getTracks().forEach(track => {
      track.enabled = false;
    });

    this.localVideo.nativeElement.srcObject = undefined;
  }

  startLocalVideo(): void {
    this.localStream.getTracks().forEach(track => {
      track.enabled = true;
    });

    this.localVideo.nativeElement.srcObject = this.localStream;
  }

  // Call functions

  async call(): Promise<void> {
    this.createPeerConnection();

    this.localStream.getTracks().forEach(
      track => this.peerConnection.addTrack(track, this.localStream)
    );

    try {
      const offer: RTCSessionDescriptionInit = await this.peerConnection.createOffer(offerOptions);
      await this.peerConnection.setLocalDescription(offer);

      this.dataService.sendMessage({type: 'offer', data: 'offer'});
    } catch (err) {
      this.handleGetUserMediaError(err);
    }
  }

  private createPeerConnection() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [{
        urls: ['stun:stun.kundenserver.de:3478']
      }
      ]
    });

    this.peerConnection.onicecandidate = this.handleIceCandidateEvent;
    // @ts-ignore
    this.peerConnection.onconnectionstatechange = this.handleIceConnectionStateChangeEvent;
    // @ts-ignore
    this.peerConnection.onsignalingstatechange = this.handleIceSignalingStataChangeEvent;
    // @ts-ignore
    this.peerConnection.ontrack = this.handleTrackEvent;

  }

  // Close video function

  private closeVideoCall(): void {

    if ( this.peerConnection ) {
      this.peerConnection.onicecandidate = null;
      this.peerConnection.onconnectionstatechange = null;
      this.peerConnection.onsignalingstatechange = null;
      this.peerConnection.ontrack = null;

    }

    this.peerConnection.getTransceivers().forEach(transceiver => {
      transceiver.stop();
    });

    this.peerConnection.close();
    this.peerConnection = null;

  }

  private handleGetUserMediaError(e: Error): void {
    switch (e.name){
      case 'NotFoundError':
        alert(' unable to open your call coz no camera and/or microphone were not found');
        break;
      case 'SecurityError':
      case 'PermissionDeniedError':
        break;
      default:
        console.log(e);
        alert(' Error opening your camera ' + e.message);
    }
    this.closeVideoCall();
  }

  // Exceptions on events

  private handleIceCandidateEvent = (event: RTCPeerConnectionIceEvent) => {
    console.log(event);

    if(event.candidate){
      this.dataService.sendMessage({
        type: 'ice-candidate',
        data: event.candidate
      });
    }
  }

  private handleIceConnectionStateChangeEvent = (event: Event) => {
    console.log(event);
    switch (this.peerConnection.iceConnectionState) {
      case 'closed' :
      case 'failed' :
      case 'disconnected':
        this.closeVideoCall();
        break;
    }
  }

  private handleIceSignalingStataChangeEvent = (event: Event) => {
    console.log(event);
    switch (this.peerConnection.signalingState) {
      case "closed" :
        this.closeVideoCall();
        break;
    }
  }

  private handleTrackEvent = (event: RTCTrackEvent) => {
    console.log(event);
    this.remoteVideo.nativeElement.srcObject = event.streams[0];

  }

  private addIncomingMessageHandler(): void {
    this.dataService.connect()

    this.dataService.messages$.subscribe(msg => {
      switch (msg.type){
        case "offer":
          this.handleOfferMessage(msg.data);
          break;
        case "answer":
          this.handleAnswerMessage(msg.data);
          break;
        case "hangup":
          this.handleHangupMessage(msg);
          break;
        case "ice-candidate":
          this.handleIceCandidateMessage(msg.data);
          break;
        default:
          console.log(' unknown message of type ' + msg.type)
      }
    },
      error => console.log(error)
    )}

  // Message handler

  private handleOfferMessage(msg: RTCSessionDescriptionInit): void {
    if(!this.peerConnection)
      this.createPeerConnection();

    if(!this.localStream)
      this.startLocalVideo();

    this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg))
      .then(() => {
        this.localVideo.nativeElement.srcObject = this.localStream;

        this.localStream.getTracks().forEach(
          track => this.peerConnection.addTrack(track, this.localStream)
        );
      })
      .then(() => {
          return this.peerConnection.createAnswer();
      })
      .then((answer) => {
        return this.peerConnection.setLocalDescription(answer);
      })
      .then(() => {
         this.dataService.sendMessage({ type: 'answer', data: this.peerConnection.localDescription});
      })
      .catch(this.handleGetUserMediaError);

  }

  private handleAnswerMessage(msg): void {
    this.peerConnection.setRemoteDescription(msg);
  }

  private handleHangupMessage(msg: Message): void {
    this.closeVideoCall();
  }

  private handleIceCandidateMessage(msg): void {
    this.peerConnection.addIceCandidate(msg)
      .catch(this.reportError);
  }

  private reportError = (e: Error) => {
    console.log(' Got Error: ' + e.name);
    console.log(e);
  }

  hangUp(): void{
    this.dataService.sendMessage({ type: 'hangup', data: ''});
    this.closeVideoCall();
  }
}

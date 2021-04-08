import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket: Socket;

  constructor() { 
    this.socket = io().connect();
  }

  // EMITTER
  sendMessage(msg: string) {
    this.socket.emit('newMessage', { message: msg });
  }

  // HANDLER
  onNewMessage() {
    return new Observable(observer => {
      this.socket.on('newMessage', msg => {
        observer.next(msg);
      });
    });
  }

}

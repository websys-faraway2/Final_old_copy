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
    this.socket.emit('newMessage', { id: this.socket.id, message: msg })
  }

  loginUser(userid: string, pwd: string) {
    this.socket.emit('login user', { id: userid, pass: pwd }, (data: any) => {
      console.log(data);
    });
  }

  // HANDLER
  onNewMessage() {
    return new Observable<JSON>(observer => {
      this.socket.on('newMessage', msg => {
        observer.next(msg);
      });
    });
  }
}

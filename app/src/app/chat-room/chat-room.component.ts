import { Component, OnInit } from '@angular/core';
import { SocketioService } from '../socketio.service'
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  nickname = ''
  message = ''
  messages = new Array()

  nicknameOn(value: string) {
    this.nickname = value;
  }

  messageOn(value: string) {
    this.message = value;
  }

  constructor(private chatService: SocketioService) { }

  ngOnInit(): void {
    this.chatService.onNewMessage().subscribe( (msg) => {
      this.messages.push(msg);
      console.log('got a msg --- ' + msg + ': ' + msg);
    });
  }

  send() {
    console.log(this.nickname);
    console.log(this.message);
    this.chatService.loginUser('1', this.message);
  }
}

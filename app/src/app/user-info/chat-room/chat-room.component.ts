import { Component, OnInit } from '@angular/core';
import { SocketioService } from '../../socketio.service'
import { HttpService } from '../../http.service';
import { ActivatedRoute, Router } from '@angular/router'
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  token = ""

  nickname = ''
  message = ''
  messages = new Array()

  nicknameOn(value: string) {
    this.nickname = value;
  }

  messageOn(value: string) {
    this.message = value;
  }

  constructor(
    private chatService: SocketioService,
    private httpService: HttpService,
    private router: Router, 
    private routeInfo: ActivatedRoute) {
    
   }

  ngOnInit(): void {
    this.routeInfo.params.subscribe((params) => this.token = params["token"]);
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

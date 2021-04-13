import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { WorkflowComponent } from './workflow/workflow.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    WorkflowComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

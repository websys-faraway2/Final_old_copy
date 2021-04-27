import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChatRoomComponent } from './user-info/chat-room/chat-room.component';
import { WorkflowComponent } from './user-info/workflow/workflow.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Router} from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserInfoModule } from './user-info/user-info.module';

@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    WorkflowComponent,
    LoginComponent,
    UserInfoComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([
      {path:'login', component: LoginComponent},
      {path: 'user-info/:token', component: UserInfoComponent},
      // {path: '', redirectTo: '/login', pathMatch: 'full'}
    ]),
    UserInfoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(router: Router) {

  }
}

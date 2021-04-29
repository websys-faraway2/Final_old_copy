import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { UserCollectionComponent } from './user-collection/user-collection.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { ProfileComponent } from './profile/profile.component';
import { UserInfoComponent } from './user-info.component';

const routes: Routes = [
  { path: 'user-info/:token', component: UserInfoComponent},
  { path: 'collection/:token', component: UserCollectionComponent},
  { path: 'chat-room/:token', component: ChatRoomComponent},
  { path: 'workflow/:token', component: WorkflowComponent},
  { path: 'profile/:token', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserInfoRoutingModule { }

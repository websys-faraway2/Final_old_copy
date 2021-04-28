import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { UserCollectionComponent } from './user-collection/user-collection.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'user-collection', component: UserCollectionComponent},
  { path: 'chat-room', component: ChatRoomComponent},
  { path: 'workflow', component: WorkflowComponent},
  { path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserInfoRoutingModule { }

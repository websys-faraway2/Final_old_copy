import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInfoRoutingModule } from './user-info-routing.module';
import { UserCollectionComponent } from './user-collection/user-collection.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    UserCollectionComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserInfoRoutingModule
  ]
})
export class UserInfoModule { }

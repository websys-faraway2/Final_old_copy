import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInfoRoutingModule } from './user-info-routing.module';
import { UserCollectionComponent } from './user-collection/user-collection.component';


@NgModule({
  declarations: [
    UserCollectionComponent
  ],
  imports: [
    CommonModule,
    UserInfoRoutingModule
  ]
})
export class UserInfoModule { }

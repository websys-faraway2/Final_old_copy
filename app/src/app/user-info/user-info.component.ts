import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  tokenID: any;

  user_name = ''
  number_finished = 0
  number_dropped = 0 
  number_times = 0
  number_conn = 0

  constructor(private routeInfo: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeInfo.params.subscribe((params) => this.tokenID = params["token"])
  }

}

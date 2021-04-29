import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
// import { Z_BLOCK } from 'node:zlib';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  token: any;

  user_name = ''
  number_finished = 0
  number_dropped = 0 
  number_times = 0
  number_conn = 0
  tab_switch_homepage = 'inline';

  constructor(
    private router: Router, 
    private routeInfo: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeInfo.params.subscribe((params) => this.token = params["token"])
  }

}

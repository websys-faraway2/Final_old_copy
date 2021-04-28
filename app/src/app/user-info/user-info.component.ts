import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
// import { Z_BLOCK } from 'node:zlib';
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
  tab_switch_homepage = 'inline';

  constructor(private routeInfo: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeInfo.params.subscribe((params) => this.tokenID = params["token"])
  }

  public tab_switch_1() {
    this.tab_switch_homepage = 'none';

  }

  public tab_switch_2() {
    this.tab_switch_homepage = 'inline';

  }

  public tab_switch_3() {
    this.tab_switch_homepage = 'inline';

  }

  public tab_switch_4() {
    this.tab_switch_homepage = 'inline';

  }

}

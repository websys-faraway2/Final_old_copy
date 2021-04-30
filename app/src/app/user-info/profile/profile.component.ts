import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  token = '';
  user_data;
  user_name;

  current_task = ''
  current_task_time = 0
  current_task_ver = ''

  constructor(
    private httpService: HttpService,
    private router: Router,
    private routeInfo: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeInfo.params.subscribe((params) => this.token = params["token"])
    this.httpService.getProfile(this.token).subscribe((data) => {
      this.user_name = data['name']
      this.current_task = data['task']
      this.current_task_time = data['time']
      this.current_task_ver = data['ver']
    })
  }

  updateName(u: string) {
    console.log("Hello!",u)
    this.user_name=u
  }

  logOut() {
    this.router.navigate([''])
  }
}

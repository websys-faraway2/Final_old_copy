import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.css']
})
export class UserCollectionComponent implements OnInit {

  token = '';

  constructor(
    private httpService: HttpService,
    private router: Router, 
    private routeInfo: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeInfo.params.subscribe((params) => this.token = params["token"])
  }

}

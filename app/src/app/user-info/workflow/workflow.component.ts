import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {


  token = '';
  
  constructor(
    private httpService: HttpService,
    private router: Router, 
    private routeInfo: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.routeInfo.params.subscribe((params) => this.token = params["token"])
    this.httpService.sendGetRequest('user').subscribe((data) => {
      console.log(data)
    })
  }


}

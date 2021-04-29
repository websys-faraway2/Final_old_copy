import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {


  token = 'f37a75dc-034a-4429-b573-4715ccfcea24';
  todo_list: any
  
  constructor(
    private httpService: HttpService,
    private router: Router, 
    private routeInfo: ActivatedRoute
    ) { }

  ngOnInit(): void {
    // this.routeInfo.params.subscribe((params) => this.token = params["token"])
    this.refresh()
  }

  addTodo(t,m,v) {
    console.log(t,m,v)
    this.httpService.addTodos(this.token, t, m, v).subscribe((data) => {
      this.todo_list.pop()
      // this.todo_list.splice(0,1)
      this.todo_list.push({task:t, time:m, ver:v})
    })
  }

  refresh() {
    this.httpService.getTodos(this.token).subscribe((data) => {
      var tmp = Array(data)
      this.todo_list = tmp[0]
    })
  }

}

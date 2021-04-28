import { Component } from '@angular/core';
const axios = require('axios').default;
declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App';
  token = 'd388a34c-9dbc-427a-9a6f-96cf8b2a4336';
  user_data;
  user_name;

  constructor() { }

  ngOnInit(): void {
    axios.get('http://localhost:3030/getUserApp/' + this.token)
      .then(response => {
        console.log(response.data.user_name)
        this.user_data = response.data
        this.user_name = response.data.name
      })
      
  }
}

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

  constructor() { }

  ngOnInit(): void {
  }
}

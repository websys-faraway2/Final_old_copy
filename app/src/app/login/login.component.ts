import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
const axios = require('axios').default;
const uuidv4 = require("uuid/v4")
declare var require: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // token_foruse = uuidv4();
  token;
  login_input = ''
  constructor(
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  onInputLogin(v: string) {
    this.login_input = v
  }
  ngOnInit(): void {
  }
  
  public generate_token() {
    this.token = uuidv4();
    // (<HTMLInputElement>document.querySelector('.token_for_signup')).innerHTML = "There is the token: " + this.token
    // axios.post('http://localhost:3030/signup/' + this.token)
    // .then(response => {
    //   console.log(response.data.msg)
    // })
    this.httpService.signUpToken(this.token).subscribe((data) => {
      console.log(data)
    })
  }
  
  public login() {
    var input_token = this.login_input
    console.log(input_token)
    if (input_token != "") {
      axios.get('http://localhost:3030/login/' + input_token)
        .then(response => {
          console.log(response.data.msg)
          if (response.data.msg == "login")
          {
            this.router.navigate(['/user-info/'+input_token]);
          }
          else {
            alert(response.data.msg)
          }
        })
    } else {
      alert("No token detected!")
    }
  }

}

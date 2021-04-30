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
  pngurl1="../../../assets/question.svg";
  pngurl2="../../../assets/question.svg";
  pngurl3="../../../assets/question.svg";
  pngurl4="../../../assets/question.svg";
  pngurl5="../../../assets/question.svg";
  pngurl6="../../../assets/question.svg";
  pngurl7="../../../assets/question.svg";
  pngurl8="../../../assets/question.svg";
  

  constructor(
    private httpService: HttpService,
    private router: Router, 
    private routeInfo: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeInfo.params.subscribe((params) => this.token = params["token"]);
    this.checkCollection();
  }

  //Get out collection
  public checkCollection(){
    this.httpService.getCollection(this.token).subscribe((data) => {
      if (data["collection1"]){
        this.pngurl1 = "../../../assets/buleberry.png";
      }
      if (data["collection2"]){
        this.pngurl2 = "../../../assets/png/cream.png";
      }
      if (data["collection3"]){
        this.pngurl3 = "../../../assets/png/Donout.png";
      }
      if (data["collection4"]){
        this.pngurl4 = "../../../assets/png/egg.png";
      }
      if (data["collection5"]){
        this.pngurl5 = "../../../assets/png/Lemon-tea.png";
      }
      if (data["collection6"]){
        this.pngurl6 = "../../../assets/png/mongo.png";
      }
      if (data["collection7"]){
        this.pngurl7 = "../../../assets/png/star.png";
      }
      if (data["collection8"]){
        this.pngurl8 = "../../../assets/png/Waffle.png";
      }
    })
    
  }
}

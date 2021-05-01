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

  png1info="Uncollected";
  png2info="Uncollected";
  png3info="Uncollected";
  png4info="Uncollected";
  png5info="Uncollected";
  png6info="Uncollected";
  png7info="Uncollected";
  png8info="Uncollected";

  
  

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
        this.pngurl1 = "../../../assets/png/buleberry.png";
        this.png1info = "Blueberry pancake";
      }
      if (data["collection2"]){
        this.pngurl2 = "../../../assets/png/cream.png";
        this.png2info = "Croissant";
      }
      if (data["collection3"]){
        this.pngurl3 = "../../../assets/png/Donout.png";
        this.png3info = "Donout";
      }
      if (data["collection4"]){
        this.pngurl4 = "../../../assets/png/egg.png";
        this.png4info = "Egg bread";
      }
      if (data["collection5"]){
        this.pngurl5 = "../../../assets/png/Lemon-tea.png";
        this.png5info = "Lemon-tea";
      }
      if (data["collection6"]){
        this.pngurl6 = "../../../assets/png/mongo.png";
        this.png6info = "Mango smoothie";
      }
      if (data["collection7"]){
        this.pngurl7 = "../../../assets/png/star.png";
        this.png7info = "Star Daifuku";
      }
      if (data["collection8"]){
        this.pngurl8 = "../../../assets/png/Waffle.png";
        this.png8info = "Waffle";
      }
    })
    
  }
}

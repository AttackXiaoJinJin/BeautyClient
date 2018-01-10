import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UsersService} from './../services/users.service';
// import {GlobalPropertyService} from './../services/global-property.service';

import {Router} from '@angular/router';
declare var $: any

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [UsersService],
})
export class SearchComponent implements OnInit {
  res:any;n;
  constructor(
    private userSer: UsersService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  ngOnInit() {
    let that=this;
    const json= this. route.snapshot.paramMap.get('json');
    that.n=json;
    that.userSer.search({'word':json}, function (result) {
      that.res=result;
    })
  }
godetail(id){
  this.router.navigate(['/shopping',id]);
  // let that=this;
  // that.userSer.userfoot({'id': id ,'tel':sessionStorage.getItem('userId')}, function (result) {
  // })
}
}

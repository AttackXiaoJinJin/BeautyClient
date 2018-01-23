import { Component, OnInit } from '@angular/core';
// import {PersonalService} from './../services/personal.service';
import {GlobalPropertyService} from '../services/global-property.service'
import {Router} from '@angular/router';
@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css'],
  providers: []
})
export class PersonalCenterComponent implements OnInit {

  constructor(
    // private personSer: PersonalService,
              private router: Router,
  private  glo:GlobalPropertyService
  ) {
  }

  ngOnInit() {
    this.glo.hiddenNavs=true;//初始化
  }

  toIndex(){
    this.router.navigate(['index']);
  }
  ngOnDestroy(){
    // console.log('personal -ngDestroy');
    this.glo.hiddenNavs=false;
  }
}


import { Component, OnInit} from '@angular/core';
import {GlobalPropertyService} from './services/global-property.service'

import {Router} from '@angular/router';
import {PersonalService} from './services/personal.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],


})
export class AppComponent  implements OnInit {
  //隐藏导航栏
  _hiddenNavs:boolean
  //隐藏回到顶部
  _hiddenTop:boolean

constructor(
  private  glo:GlobalPropertyService,

) {}
  ngOnInit() {
    //初始化时不隐藏
    this._hiddenNavs=this.glo.hiddenNavs
    this._hiddenTop=this.glo.hiddenTop;

  }
  ngAfterContentChecked(){
    //感受到全局变量的变化起到追踪的作用
    this._hiddenNavs=this.glo.hiddenNavs
    this._hiddenTop=this.glo.hiddenTop

  }

}

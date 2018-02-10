import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service';
import {GlobalPropertyService} from '../services/global-property.service';

import {Router} from '@angular/router';
import {LovesService} from "../services/loves.service";
declare var $: any
@Component({
  selector: 'app-loves',
  templateUrl: './loves.component.html',
  styleUrls: ['./loves.component.css'],
  providers: [UsersService,LovesService]
})
export class LovesComponent implements OnInit {
  //显示所有的女装
  loves:any
  n=0
  lovesStart=[72,80,88,96,104]
  number=['1','2','3','4','5']
  modal_if=false
  full_height:any
  scroll_top:any
  isLogin:boolean=false
  constructor(
    private userSer: UsersService,
    private loveSer: LovesService,
    private router: Router,
    private  glo:GlobalPropertyService
  ) {
  }
  ngOnInit() {
      //默认加载第一页
      this.showloves(0);
  }
  getData(event){
    let that=this;
    that.isLogin=event;
    // console.log(that.isLogin+"这是是否登录");
    if(that.isLogin==true){
      this.unlogin(that);
    }
  }
  //封装未登录的操作
  unlogin(that){
    // console.log("用户未登录！！！！！！！！！！");
    //让模态框显示在用户的该位置
    // that.scroll_top = window.scrollY*1.1+"px";
    that.scroll_top = document.body.scrollHeight/3+"px";
    that.full_height=document.body.offsetHeight +"px";
    //弹出模态框
    that.modal_if =true;
  }

  //去登录界面
  toLogin(){
    this.router.navigate(['/login']);
  }
  // 关闭模态框
  close(){
    this.modal_if = false;
  }


showloves(index){
  let that=this;
  that.loveSer.showloves(that.lovesStart[index]+'',function (result) {
    if ( result.statusCode !== 0){
      that.loves=result;
    }
  })
}


}

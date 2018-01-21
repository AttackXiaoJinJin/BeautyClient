import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UsersService} from "../services/users.service";

declare var $ :any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UsersService],
})
export class SidebarComponent implements OnInit {
  //判断登录
  if_login:boolean=false
  //头像
  icon:any
  //手机
  tel:any
  //用户名
  name:any
  //id
  user_id:any
  mes:any
  //是否显示侧边栏
  my_class:any='free'
  my_class1:any='free'
  my_class2:any='free'



  mesf:any
  //我的购物信息
  shopresult:any
  footresult:any
  constructor(
    private userSer: UsersService,
    private router: Router,
  ) { }


  ngOnInit() {
    let that=this
    if(sessionStorage.getItem('userPhone')){
      that.tel= sessionStorage.getItem('userPhone')
      that.icon= sessionStorage.getItem('icon')
      that.name= sessionStorage.getItem('userName')
      that.user_id=sessionStorage.getItem('userId')
      that.if_login=true
    }else{
      that.if_login=false
    }

  }
//  init===========

//  购物车
  myshop(){
    let that=this
    //购物车
    that.userSer.myshop(that.tel+'', function (result) {
      that.shopresult=result

      // that.mes.unshift(that.detail);
      // that.mesf=result[1];
    })
  }
//  我的足迹
  myfoot(){
    let that=this
    //购物车
    that.userSer.myfoot(that.tel+'', function (result) {
      that.footresult=result
      console.log(result)
      console.log("aaaa")
      // that.mes.unshift(that.detail);
      // that.mesf=result[1];
    })
  }



// 个人中心—购物车
  goshop(){
    this.router.navigate(['personal-center/shapping-car']);
  }

  //点击固定0
  fixation_links(){
    this.my_class='docked';
    this.my_class1='free';
    this.my_class2='free';
  }
  fixation_files(){
    this.myshop()
    this.my_class1='docked';
    this.my_class='free';
    this.my_class2='free';
  }
  fixation_tools(){
    this.myfoot()
    this.my_class2='docked';
    this.my_class='free';
    this.my_class1='free';
  }
  //隐藏
  undock(){
    let that=this
    that.my_class='free';
    that.my_class1='free';
    that.my_class2='free';
  }


}

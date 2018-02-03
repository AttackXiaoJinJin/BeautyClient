import { Component, OnInit } from '@angular/core';
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [UsersService]

})
export class NavComponent implements OnInit {
  //用户手机
  userPhone:any;
  userName:any;
  icon:any;
  user_id:any;
  _search:any;
  //是否登录
  isLogin:boolean = false;
  //模态框,未登录提示登录
  modal_if: boolean=false;


  full_height:any;
  scroll_top:any;

  innernum:any="innernum hide";
  newnum:any="newnum hide";
  constructor(
    private userSer:UsersService,
    private router:Router,
  ) {


  }

  ngOnInit() {
    let that=this
    if(sessionStorage.getItem('userName')){
      that.userName=sessionStorage.getItem('userName')
      that.userPhone=sessionStorage.getItem('userPhone')
      that.icon=sessionStorage.getItem('icon')
      that.icon=sessionStorage.getItem('icon')
      that.isLogin = true;
    }else{
      this.isLogin = false;
    }

  }
//  init==================

  // 关闭模态框
  close(){
    this.modal_if = false;
  }



  toSearch(){
    if(this._search){
      if(window.location.href.indexOf('search')!=-1){
        window.location.href=window.location.href.substring(0,window.location.href.indexOf('search')+6)+"/"+this._search;
        // console.log(window.location.href.substring(0,window.location.href.indexOf('search')+6));
      }else{
        this.router.navigate(['/search',this._search]);
        this._search="";
      }
    }
  }

  //封装未登录的操作
  unlogin(that){
    console.log("用户未登录！！！！！！！！！！");
    //让模态框显示在用户的该位置
    that.scroll_top = window.scrollY*1.1+"px";
    that.full_height=document.body.offsetHeight +"px";
    //弹出模态框
    that.modal_if =true;
  }

  //注销
  end(){
      sessionStorage.removeItem('userId')
      sessionStorage.removeItem('userName')
      sessionStorage.removeItem('userPhone')
      sessionStorage.removeItem('icon')
      this.router.navigate(['/login']);
      this.isLogin = false
  }

  goshop(){
    this.router.navigate(['personal-center/shopping-car']);
  }

  godetail(id){
    this.router.navigate(['/shopping',id]);
  }

  search(f){
    let that = this;
    let word=f.form.value.search;
    that.router.navigate(['/search',word]);
  }


}

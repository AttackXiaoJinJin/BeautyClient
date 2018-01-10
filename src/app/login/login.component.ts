import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service';
import {GlobalPropertyService} from '../services/global-property.service'

import {Router} from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsersService],
})
export class LoginComponent implements OnInit {
  //状态码
  statem: any;
  //登录提示
  login_res: string;
  tel: string = '';
  name: string = '';
  n:any;
  code:any;
  time:any;
  rgpsw1: string;
  pswconfirm1: string;

  constructor(
              private userSer: UsersService,
              private router: Router,
              private  glo: GlobalPropertyService) {
  }

  ngOnInit() {
    this.glo.hiddenNavs = true;//初始化

  }

  hid() {
    this.statem =0;
  }
  //登录
  toLogin(login_form) {
    let that = this;
    that.n = 0;
    that.userSer.login(login_form.form.value, function (result) {
      if (result.StateCode == 0) {
        $('.login_ti span').css('display', 'block');
        that.login_res = '用户名或密码错误！';
      } else {
        //刷新页面
        location.reload();
        //手机号
        that.tel = login_form.form.value.userId;
        //姓名
        that.name = result[0].username;
        sessionStorage.setItem('userId', that.tel);
        sessionStorage.setItem('username', that.name);
        sessionStorage.setItem('icon', result[0].icon);
        that.router.navigate(['/index']);
      }
    })
  }

  ngOnDestroy() {
    // console.log('personal -ngDestroy');
    this.glo.hiddenNavs = false;
  }

  reset() {
    this.statem = 1;
    this.rgpsw1 = '';
    this.pswconfirm1 = '';
  }

  send(tel) {
    let that = this;
    that.userSer.getyanzheng({'telephone': tel.form.value.retel}, function (result) {
      if (result.StateCode == 0) {
        alert('手机号不正确');
      }
      else {
        that.code = result.code;
        that.tel=tel.form.value.retel;
      }
    })
    that.time = 60;
    var obj = $("#gettest");
    settime(obj);
    function settime(obj) {
      if (that.time== 0) {
        obj.attr('disabled', false);
        obj.val("获取验证码");
        that.time= 60;
        return;
      } else {
        obj.attr('disabled', true);
        obj.val("重新发送(" + that.time+ ")");
        that.time--;
      }
      setTimeout(function () {
          settime(obj)
        }
        , 1000)
    }

  }
  toreset(form){let that=this;
  if(form.form.value.retest==that.code){
that.statem=2;
  }
 else{
   that.statem=3;
    setTimeout(function(){
      that.statem =1;
    }, 3000 );
  }
  }
  //新密码
  repass(form){
      let that=this;
      that.userSer.Resetp({'newpass': form .form.value.newpass,'tel':that.tel},function (result) {
        if(result.StateCode == 0){
          alert('erro');
        }
        else{
          that.statem=4;
          setTimeout(function(){
            that.statem =0;
          }, 3000 );}
      })
  }
}


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
  //找回密码的状态码，
  //状态码不同，弹出框不同
  statem: any;
  //登录提示
  login_res: string;
  //登录手机号
  _telephone:any;
  _password:any
  //找回密码手机号
  _findtel:any
  //验证码
  yanzheng: any;
  //验证码按钮的value
  yanvalue:any;
  //新密码
  _newpass:any;
  //登录失败
  login_ti:boolean=false;
  //用户名
  name: string = '';
  //新密码
  newpass:any;
  //倒计时的时间
  s:any='30';
  //输入的验证码
  _inputyanzheng:any;
  //倒计时是否结束
  if_countover:boolean;


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
    //初始化界面是 验证码
    this.yanvalue="验证码";
    //因为一开始的页面加载没有手机号
    this.if_countover=false;


    this.login_ti=false


  }

  hid() {
    this.statem =0;
  }

  //随机生成六位数
  makesix(){
    //随机产生六位数验证码
    let range=function(start,end)
    {
      let array=[];
      for(let i=start;i<end;++i) array.push(i);
      return array;
    };
    let randomstr = range(0,6).map(function(x){
      return Math.floor(Math.random()*10);
    }).join('');
    // console.log(randomstr);
    return randomstr;
  }

  //登录
  toLogin() {
    let that = this
    that.n = 0
    that.userSer.login(that._telephone+'',that._password,function (result) {
      if (result.statusCode == 2) {
        that.login_ti=true
        that.login_res = '用户名或密码错误！';
      } else {
        //刷新页面
        location.reload();
        //姓名
        that.name = result[0].username;
        sessionStorage.setItem('userPhone', that._telephone);
        sessionStorage.setItem('userName', that.name);
        sessionStorage.setItem('icon', result[0].icon);
        that.router.navigate(['/index']);
      }
    })
  }

  ngOnDestroy() {
    // console.log('personal -ngDestroy');
    this.glo.hiddenNavs = false;
  }

  //忘记密码
  reset() {
    this.statem = 1;
    this.rgpsw1 = '';
    this.pswconfirm1 = '';
  }

  //倒计时
  countdown(){
    let that=this;
    let d = new Date("1111/1/1,0:00:30");
    that.if_countover=true;
    let interval = setInterval(function () {
      //返回时间的秒。返回值是 0 ~30 之间的一个整数。
      that.s = d.getSeconds();
      that.yanvalue=that.s+"s后重新发送";
      that.s = that.s < 10 ? "0" + that.s : that.s;
      if (that.s == 0) {
        //倒计时结束清除interval
        clearInterval(interval);
        //变成重新发送
        that.yanvalue="重新发送";
        //生成未知的随机六位数
        that.yanzheng=that.makesix();
        // console.log(that._confirm_code);
        //时间到，验证码按钮able
        that.if_countover=false;
      }
      d.setSeconds(that.s - 1);
    },1000)
  }



  //获取验证码
  getyanzheng() {
    let that = this;
    //倒计时
    that.countdown();
    that.userSer.getyanzheng( that._findtel+'', function (result) {
      if (result.yanzheng) {
        that.yanzheng= result.yanzheng;
        console.log(that.yanzheng)
      }
    })
  }



  //新密码
  repass(){
      let that=this;
    //  验证码匹配失败
    if(that._inputyanzheng!==that.yanzheng){
      // 验证码错误
      that.statem=3
      setTimeout(function(){
        that.statem =0;
      }, 3000 )
    }
    else{
      that.userSer.resetpass(that._findtel+'',that._newpass+"",function (result) {
        console.log(result.statusCode)
        if(result.statusCode ===7){
          // alert('您还未注册，请先注册！');
          that.statem=4
          setTimeout(function(){
            that.statem =0;
          }, 3000 )
        }
        else if(result.statusCode ===4){
          // alert('重置密码成功，请登录！');
          that.statem=5
          setTimeout(function(){
            that.statem =0;
          }, 3000 )


        }
      })


    }

  }
}


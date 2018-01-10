import { Component, OnInit} from '@angular/core';
import {UsersService} from '../services/users.service';
import {GlobalPropertyService} from '../services/global-property.service'

import {Router} from '@angular/router';
//适用
declare var $: any;
@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css'],
  providers: [UsersService]
})
export class RegistComponent implements OnInit {
  //输入框的手机号
  _telephone:any;
  //倒计时是否结束
  if_countover:boolean;
  regist_res: string;
  nologin: any;
  //验证码
  yanzheng: any;
  //验证码按钮的value
  yanvalue:any;
  //倒计时的时间
  s:any='30';
  //输入的验证码
  _inputyanzheng:any;


  constructor(private userSer: UsersService,
              private router: Router,
              private  glo: GlobalPropertyService) {
  }

  ngOnInit() {
    this.glo.hiddenNavs = true;//初始化
    //初始化界面是 验证码
    this.yanvalue="验证码";
    //因为一开始的页面加载没有手机号
    this.if_countover=false;
  }

  //注册
  toregist(reg) {
    let that = this;
    if (that._inputyanzheng== that.yanzheng) {
      that.userSer.regist(reg.form.value, function (result) {
        if (result.StateCode == 0) {
          that.regist_res = '用户名已被注册！';
        } else {
          that.regist_res = '';
          sessionStorage.setItem('userId', reg.form.value.userId);
          sessionStorage.setItem('username', reg.form.value.username);
          sessionStorage.setItem('icon', 'icon_default.jpg');
          location.reload();
          that.router.navigate(['/index']);
        }
      })
    }
    else {
      that.nologin = true;
      setTimeout(function () {
        that.nologin = false;
      }, 3000)
    }
  }

  ngOnDestroy() {
    console.log('personal -ngDestroy');
    this.glo.hiddenNavs = false;
  }

  //获取验证码
  getyanzheng() {
    let that = this;
    //倒计时
    that.countdown();
    that.userSer.getyanzheng( that._telephone+'', function (result) {
      if (result.yanzheng) {
        that.yanzheng= result.yanzheng;
        console.log(that.yanzheng)
      }
    })


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


}



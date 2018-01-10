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
  regist_res: string;
  nologin: any;
  code: any;
  countdown :any;
  constructor(private userSer: UsersService,
              private router: Router,
              private  glo: GlobalPropertyService) {
  }

  ngOnInit() {

    this.glo.hiddenNavs = true;//初始化
    $(function () {
      var btn = $("#send-captcha");
      // 定义发送时间间隔(s)
      var SEND_INTERVAL = 60;
      var timeLeft = SEND_INTERVAL;

      /**
       * 绑定btn按钮的监听事件
       */
      var bindBtn = function () {
        btn.click(function () {
          alert('111');
          // 需要先禁用按钮（为防止用户重复点击）
          btn.unbind('click');
          btn.attr('disabled', 'disabled');
          $.ajax({
            type: 'post',
            url: 'http://localhost:3001/users/send',
            data: {'tel': 112},
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (result) {
              if (result.stateCode == 1) {
                alert('发送成功');
                //成功
                timeLeft = SEND_INTERVAL;
                timeCount();
              } else if (result.stateCode == 0) {
                alert('发送失败');
                // ** 重要：因为发送失败，所以要恢复发送按钮的监听 **
                bindBtn();
                btn.remove('disabled');
              }
            },
            error: function (err) {

            }// ajax接口调用...
          })
        })
      }


      var timeCount = function () {
        window.setTimeout(function () {
          if (timeLeft > 0) {
            timeLeft -= 1;
            btn.html(timeLeft + "后重新发送");
            timeCount();
          } else {
            btn.html("重新发送");
            bindBtn();
          }
        }, 1000);
      }
    })
  }

  toregist(reg) {
    let that = this;
    if (reg.form.value.test == that.code) {
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

  send(tel) {
    let that = this;
    that.userSer.check({'telephone': tel.form.value.userId}, function (result) {
      if (result.StateCode == 0) {
        alert('erro');
      }
      else {
        that.code = result.code;
        console.log(that.code)
      }
    })
   that.countdown = 60;

    var obj = $("#send-captcha");
    settime(obj);

    function settime(obj) {
      if (that.countdown == 0) {
        obj.attr('disabled', false);
        obj.val("免费获取验证码");
        that.countdown = 60;
        return;
      } else {
        obj.attr('disabled', true);
        obj.val("重新发送(" + that.countdown + ")");
        that.countdown--;
      }
      setTimeout(function () {
          settime(obj)
        }
        , 1000)
    }
  }
}



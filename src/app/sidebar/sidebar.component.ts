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

  mes:any
  //手机
  tel:any
  //用户名
  name:any
  mesf:any
  num:any
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
    }

    //购物车
    that.userSer.myshop(that.tel+'', function (result) {
        that.mes = result[0];
      // that.mes.unshift(that.detail);
        that.num=that.mes.length;
        that.mesf=result[1];
    })

    $(document).ready(function () {
      var docked = 0;

      $("#dock li ul").height($(window).height());

      $("#dock .dock-keleyi-com").click(function () {
        $(this).parent().parent().addClass("docked").removeClass("free");

        docked += 1;
        var dockH = ($(window).height()) / docked
        var dockT = 0;

        $("#dock li ul.docked").each(function () {
          $(this).height(dockH).css("top", dockT + "px");
          dockT += dockH;
        });
        $(this).parent().find(".undock").show();
        $(this).hide();

      });

      $("#dock .undock").click(function () {
        $(this).parent().parent().addClass("free").removeClass("docked")
          .animate({ right: "-160px" }, 200).height($(window).height()).css("top", "0px");

        docked = docked - 1;
        var dockH = ($(window).height()) / docked
        var dockT = 0;

        $("#dock li ul.docked").each(function () {
          $(this).height(dockH).css("top", dockT + "px");
          dockT += dockH;
        });
        $(this).parent().find(".dock-keleyi-com").show();
        $(this).hide();
      });

      $("#dock li").hover(function () {
        $(this).find("ul").animate({ right: "20px" }, 200);
      }, function () {
        $(this).find("ul.free").animate({ right: "-180px" }, 200);
      });
    });


  }

}

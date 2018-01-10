import { Component, OnInit} from '@angular/core';
import {GlobalPropertyService} from './services/global-property.service'

import {Router} from '@angular/router';
import {PersonalService} from './services/personal.service';

declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PersonalService],

})
export class AppComponent  implements OnInit {
  qq1:any;
  _hiddenNavs:boolean;
icon:any;mes;tel;
name:any;
mesf:any;num:any;
constructor(
  private  glo:GlobalPropertyService,
  private perSer: PersonalService,
  private router: Router,
) {}
  ngOnInit() {
  this.tel= sessionStorage.getItem('userId');
  this.icon= sessionStorage.getItem('icon');
  this.name= sessionStorage.getItem('username');
    this._hiddenNavs=this.glo.hiddenNavs;
    const that = this;
    const body={'tel':sessionStorage.getItem('userId')}
    that.perSer.myshop(body, function (result) {
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
    $(function(){
      $(document).scroll(function(){
        if($(document).scrollTop() > 100){
          $("#top").fadeIn(1000);

        }else {
          $("#top").fadeOut(1000);
          // alert('mmp')
        }
      });
      $("#top").click(function(){
        $('body,html').animate({scrollTop:0},1000);
      });
    });
  }
  ngAfterContentChecked(){
    this._hiddenNavs=this.glo.hiddenNavs;
  }
  end(){
    sessionStorage.setItem('userId','');
    this.tel= sessionStorage.getItem('userId');
  }
  goshop(){
    this.router.navigate(['personal-center/shapping-car']);
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

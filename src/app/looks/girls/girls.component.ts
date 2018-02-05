import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';

import {Router} from '@angular/router';
import {LooksService} from "../../services/looks.service";
declare var $ :any;
@Component({
  selector: 'app-girls',
  templateUrl: './girls.component.html',
  styleUrls: ['./girls.component.css'],
  providers: [UsersService,LooksService]
})
export class GirlsComponent implements OnInit {
  showGirlResult:any;
  showgirlArr1:any
  showgirlArr2:any
  showgirlArr3:any
  showgirlArr4:any
  showgirlArr5:any
  constructor(
    private userSer: UsersService,
    private lookSer: LooksService,
    private router: Router,
  ) { }

  ngOnInit() {
    let that = this;
    that.showgirls(32,8)
    that.showgirls(40,8)
    that.showgirls(48,8)
    that.showgirls(56,8)
    that.showgirls(64,8)
    $(document).ready(function () {
      $('ul.nav > li').click(function (e) {
        e.preventDefault();
        $('ul.nav > li').removeClass('active');
        $(this).addClass('active');
      });

    });
    function Add_Data() {
      if($("#fix").offset()) {
        var top = $("#fix").offset().top;
        const title = $("#title").offset().top;

        const scrolla = $(window).scrollTop();
        const cha = parseInt(top) - parseInt(scrolla);
        if (cha <= 0) {
          $("#fix").addClass("navbar-fixed-top");
        }
        if (parseInt(scrolla) < parseInt(title)) {
          $("#fix").removeClass("navbar-fixed-top");
        }
      }
    };

    $(window).scroll(Add_Data);
    // function scroll(s) {
    //   let timer = null;
    //   // var h = document.body.scrollTop;
    //   timer = setInterval(function () {
    //     if ($(document).scrollTop()==s){
    //       clearInterval(timer);
    //     }
    //     else if ($(document).scrollTop() > s) {
    //       $(document).scrollTop($(document).scrollTop()-10) ;
    //     }
    //     else if ($(document).scrollTop()<s){
    //       $(document).scrollTop($(document).scrollTop()+10) ;
    //     }
    //
    //   }, 1);
    // }
    // function clear() {
    //   $('.tian').css('');
    //   $('.thin').css('');
    //   $('.wen').css('');
    //   $('.chang').css('');
    //   $('.qing').css('');
    //   $('.xia').css('');
    // }
    // $('.tian').click (function () {
    //   clear();
    //   scroll(520);
    // });
    // $('.thin').click(function () {
    //   clear();
    //   scroll(1650);
    //
    // });
    // $('.wen').click(function () {
    //   clear();
    //   scroll(2750);
    // });
    // $('.chang').click(function () {
    //   clear();
    //   scroll(3800);
    // });
    // $('.qing').click(function () {
    //   clear();
    //   scroll(4820);
    // });
    // $('.xia').click(function () {
    //   clear();
    //   scroll(520);
    // });
    // $(document).scrollTop(0);

  }


godetail(id){
  let that=this;
  that.router.navigate(['/shopping',id] );
}
//显示内容
showgirls(start,end){
    let that=this
  this.lookSer.showgirls(start+'',end+'',function (result) {
    if ( result.statusCode==0){
    }else {
      switch (start){
        case 32:that.showgirlArr1= result;break;
        case 40:that.showgirlArr2= result;break;
        case 48:that.showgirlArr3= result;break;
        case 56:that.showgirlArr4= result;break;
        case 64:that.showgirlArr5= result;break;

      }

    }
  })
}
//甜美可爱
  scrollTo1(){
    window.scrollTo(0,520)
  }
//滚动到 心机显瘦
  scrollTo2(){
    window.scrollTo(0,1650)
  }
  //滚动到 温柔气质
  scrollTo3(){
    window.scrollTo(0,2750)
  }
  //滚动到 长腿秘诀
  scrollTo4(){
    window.scrollTo(0,3800)
  }
  //滚动到 清新减龄
  scrollTo5(){
    window.scrollTo(0,4820)
  }





}

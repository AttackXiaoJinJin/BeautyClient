import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-backtop',
  templateUrl: './backtop.component.html',
  styleUrls: ['./backtop.component.css']
})
export class BacktopComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //返回顶部
    $(function(){
      /******** JQuery ********/
      $(window).scroll(function(){
        var Top = $('html').offset().top;
        if($(this).scrollTop() == Top){
          $("#top").css('visibility', 'hidden');
        }
        else{
          $("#top").css('visibility', 'visible');
        }
      });
      $("#top").click(function(){
        $("html,body").animate({scrollTop:0},400);//向上滑动时间
      });
    });
  }

}

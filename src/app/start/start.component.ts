import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {GlobalPropertyService} from '../services/global-property.service'

//引用jQuery
declare var $:any;
@Component({
  selector: 'app-start',
  templateUrl: 'start.component.html',
  styleUrls: ['start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private router:Router,
              private  glo:GlobalPropertyService
  ) { }

  ngOnInit() {
    this.glo.hiddenNavs=true;
    let segmentWidth = 0;
    $("#container #content li").each(function(){
      //外部宽度,不包含margin
      segmentWidth+= $(this).outerWidth(true);
    });

    $("#container #content li").clone().appendTo($("#container #content"));

    run(100000);

    function run(interval) {
      //向左移动，完成后执行回调函数,让left置0
      $("#container #content").animate({"left": -segmentWidth}, interval, "linear", function () {
        $("#container #content").css("left", 0)
        run(100000)
      })
    }
    }
    //=======================
  ngOnDestroy(){
    // console.log('personal -ngDestroy');
    this.glo.hiddenNavs=false;
  }
}

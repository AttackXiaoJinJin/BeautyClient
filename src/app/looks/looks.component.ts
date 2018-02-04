import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-looks',
  templateUrl: './looks.component.html',
  styleUrls: ['./looks.component.css']
})
export class LooksComponent implements OnInit {

  constructor(
    private router:Router,
  ) { }

  if_hover=false
  ngOnInit() {
    //移到顶部
    window.scrollTo(0,0)
    // $(".text").mouseover(function () {
    //   $(".text").addClass('animated  pulse')
    // })
    // $(".text").mouseout(function () {
    //   $(".text").removeClass('animated'+ 'animated pulse')
    // })
  }

  bebig(){
    this.if_hover=true
  }
  besmall(){
    this.if_hover=false
  }

}

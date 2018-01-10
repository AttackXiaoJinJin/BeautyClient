import { Component, OnInit } from '@angular/core';
import {PersonalService} from '../../services/personal.service';

import {Router} from '@angular/router';
declare var $: any
@Component({
  selector: 'app-shiyan',
  templateUrl: './shiyan.component.html',
  styleUrls: ['./shiyan.component.css'],
  providers: [PersonalService]
})
export class ShiyanComponent implements OnInit {
n:any;i=0;
  constructor(
    private personSer: PersonalService,
    private router: Router
  ) { }

  ngOnInit() {

    $(function(){
      const $animate = $('#animate');
      const $opposite = $('#opposite');
      $('.well-item').hover(function(){
        $(this).find('.correct').children().removeClass();
        $(this).find('.opposite').children().removeClass();
        $(this).find('.correct').children().addClass('test');
        $(this).find('.opposite').children().addClass('test2');
      }, function (){
        $(this).find('.correct').children().removeClass();
        $(this).find('.opposite').children().removeClass();
        $(this).find('.correct').children().addClass('test2');
        $(this).find('.opposite').children().addClass('test');
      });
      $('.camera1').click(function () {
        $('.row').addClass('test3');
        $('.shares_content').addClass('test4').addClass('shares_content1');
      });
      $('.submit').click(function () {
        $('.shares_content').removeClass('test4').removeClass('shares_content1');
        $('.row').removeClass('test3');
      });


    });
    $(document).scrollTop(0);
  }

}


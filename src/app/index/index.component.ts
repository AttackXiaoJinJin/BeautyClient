import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

declare let $ :any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
hdp1=[{'pic':'m1.jpg','c':'c1'},{'pic':'m2.jpg','c':'c2'},{'pic':'m3.jpg','c':'c3'},{'pic':'m4.jpg','c':'c4'},{'pic':'m5.jpg','c':'c5'},{'pic':'paris_logo.jpg','c':'c3-logo'},{'pic':'m6.jpg','c':'c6'}];
hdp2=[{'pic':'m2-1.jpg','c':'c1'},{'pic':'m2-2.jpg','c':'c2'},{'pic':'m2-3.jpg','c':'c3'},{'pic':'m2-4.jpg','c':'c4'},{'pic':'m2-5.jpg','c':'c5'},{'pic':'m2-6.jpg','c':'c6'},{'pic':'milan_logo.jpg','c':'c2-logo'}];
hdp3=[{'pic':'m3-1.jpg','c':'c1'},{'pic':'m3-2.jpg','c':'c2'},{'pic':'m3-3.jpg','c':'c3'},{'pic':'m3-4.jpg','c':'c4'},{'pic':'m3-5.jpg','c':'c5'},{'pic':'lundon_logo.jpg','c':'c4-logo'},{'pic':'m3-6.jpg','c':'c6'}];
hdp4=[{'pic':'m4-1.jpg','c':'c1'},{'pic':'m4-2.jpg','c':'c2'},{'pic':'m4-3.jpg','c':'c3'},{'pic':'m4-4.jpg','c':'c4'},{'pic':'m4-5.jpg','c':'c5'},{'pic':'m4-6.jpg','c':'c6'},{'pic':'newyork_logo.jpg','c':'c2-logo'}];

lun=['1.jpg','2.jpg','3.jpg','4.jpg'];

  constructor(
    private router: Router,
  ) {}
  ngOnInit() {
    $(function () {
      let count = 0
      //设置默认选中
      $('.fl_s .ban-bottom a')
        .eq(count).stop().addClass('banner-select')
      function timer() {
        count++
        //0,1,2,3,4,5
        count = (count===6 ? 0 : count)
        //获得序号
        //siblings同胞元素全都隐藏
        $('.fl_s .bannerimg img')
          .eq(count).stop().show()
          .siblings().hide()
        // $('.fl_s .ban-bottom .dor a')
        $('.fl_s .ban-bottom a')
          .eq(count).stop().addClass('banner-select')
          .siblings().removeClass('banner-select');
      }
      let time = setInterval(timer, 3000)

      //鼠标悬浮在下标时停止滚动
      $('.fl_s').hover(function () {
        //清除定时器//显示图片
        clearInterval(time);
        $('.bannerimg').css({'display': 'block'});
      }, function () {
        //回调函数//恢复定时器//隐藏图片
        $('.fl_s .bannerimg').css({'display': 'block'});
        time = setInterval(timer, 3000);
      });

      //1.右单击
      $('.fl_s .btn_right').click(function () {
        count++;
        count = (count===6 ? 0 : count)
        //获得的序号
        //图片
        $('.fl_s .bannerimg img')
          .eq(count).stop().show()
          .siblings().hide();
        //下标
        $('.fl_s .ban-bottom a')
          .eq(count).stop().addClass('banner-select')
          .siblings().removeClass('banner-select');
      });

      //2.左单击
      $('.fl_s .btn_left').click(function () {
        count--
        count = (count === 0 ? 0 : count)
        //获得序号
        //图片
        $('.fl_s .bannerimg img')
          .eq(count).stop().show()
          .siblings().hide();
        //下标
        $('.fl_s .ban-bottom a')
          .eq(count).stop().addClass('banner-select')
          .siblings().removeClass('banner-select');
      })
      //3.点击圆点变换
      $('.fl_s .ban-bottom a').hover(function () {
        //获得序号
        let n = $(this).index()
        //图片
        $('.fl_s .bannerimg img')
          .eq(n).stop().show()
          .siblings().hide()
        //下标
        $('.fl_s .ban-bottom a')
          .eq(n).stop().addClass('banner-select')
          .siblings().removeClass('banner-select');
      })
    });

    //自己封装的轮播图========================


    //==========今日热点
    let i = 0;
    let imgWidth = $("#show-area ul li").width();
    let clone = $("#show-area ul li").first().clone();
    //将第一张添加到队尾
    $("#show-area ul").append(clone);
    let length = $("#show-area ul li").length;//得到所有li的个数
    $("#button-right").click(function () {
      Toright();
    });
    //右按钮
    $("#button-left").click(function () {
      Toleft();
    });
    function Toright() {
      i++;
      if (i == length) {
        //当当前图片为最后一张图片的时候
        // （我们一开始复制并且添加到ul最后面的图片）并且再点击了一次左按钮，
        // 这时候我们就利用css的快速转换效果把ul移动第一张图片的位置并且第二张图片滑入达到无缝效果（css的变换效果很快我们肉眼是很难看见的）
        $("#show-area ul").css({left: 0});
        i = 1;
      }
      //向右移，往左移动-px
      $("#show-area ul").stop().animate({left: -i * imgWidth}, 1000);
    }
    function Toleft() {
      //同理，如果当前图片位置是第一张图片我再按一下左按钮
      // 那么我们也利用css的快速变换使它的位置来到最后一张图片的位置（size-1），
      // 并且让倒数第二张图片滑动进来
      i--;
      if (i == -1) {
        $("#show-area ul").css({left: -(length - 1) * imgWidth});
        i = length - 2;
      }
      //i是负数
      $("#show-area ul").animate({left: -i * imgWidth}, 1000);
      // $("#controler div").eq(i).addClass("onclick").siblings().removeClass("onclick");

    }
//======================================
    //右侧男装轮播======================
    let t;
    let index = 0;
    t = setInterval(play, 3000)
    function play() {
      index++;
      if (index > 6) {
        index = 0
      }
      $("#lunbobox ul li").eq(index).css({
        "background": "#999",
        "border": "1px solid #ffffff"
      }).siblings().css({
        "background": "#000000",
        "border": ""
      })
      //动画效果
      $(".lunbo a").eq(index).fadeIn(1000).siblings().fadeOut(1000);
    }
    //当鼠标悬浮在下方item时
    $("#lunbobox ul li").hover(function () {
      $(this).addClass("lito").siblings().removeClass("lito");
      $(this).css({
        "background": "#bababa",
        "border": "1px solid #ffffff"
      }).siblings().css({
        "background": "#000000"
      })
      let index = $(this).index();
      //鼠标悬浮，则切换item
      $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000);
    });
    $("#lunbobox ul li,.lunbo a img").hover(
      //清除定时器
      //mouseenter
      function () {
        // $('#toright,#toleft').show()
        clearInterval(t);
      },
      function () {
        //不悬浮的时候
        //mouseleave
        t = setInterval(play, 2000)
        function play() {
          index++;
          if (index > 4) {
            index = 0
          }
          $("#lunbobox ul li").eq(index).css({
            "background": "#999",
            "border": "1px solid #ffffff"
          }).siblings().css({
            "background": "#000000"
          })
          $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000);
        }
      });
//================
//文字展示
    $(function () {
      let index = 0;
      let word;
      //文字赋值
      word = $("#poem1").text();
      setInterval(type, 300);
      function type() {
        let typePanel = $("#aa");
        //0.3s添加一个字
        typePanel.html(word.substring(0, index++));
        //注意div的空白节点
        if (index == word.length) {
          $("#poem1").text('');
          index = 0;
        }
        //没看懂--------------
        if (index % 3 === 0) {
          typePanel.addClass("");
        } else if (index % 3 == 1) {
          typePanel.addClass("saying");
        }
      }
    });

//==========================================
    $(".hit1").on("mouseenter",function() {
      $("#share_txt1-1").css({height: "0", top: "100px"}).animate({height: "200px", top: "0"}, 800)
        .css("display","block")
    })
    $(".hit1").on("mouseleave",function() {
      $("#share_txt1-1").css({height: "200px", top: "0px"}).animate({height: "0", top: "100px"}, 800)
    })
    $(".hit2").on("mouseenter",function() {

      $("#share_txt1-2").css({height: "0", top: "100px"}).animate({height: "200px", top: "0"}, 800)
        .css("display","block")
    })
    $(".hit2").on("mouseleave",function() {

      $("#share_txt1-2").css({height: "200px", top: "0px"}).animate({height: "0", top: "100px"}, 800)

    })
    $(".hit3").on("mouseenter",function() {

      $("#share_txt1-3").css({height: "0", top: "100px"}).animate({height: "200px", top: "0"}, 800)
        .css("display","block")
    })
    $(".hit3").on("mouseleave",function() {

      $("#share_txt1-3").css({height: "200px", top: "0px"}).animate({height: "0", top: "100px"}, 800)

    })

  }
}

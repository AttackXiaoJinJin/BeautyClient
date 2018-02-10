import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {LovesService} from "../../services/loves.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-loveitem',
  templateUrl: './loveitem.component.html',
  styleUrls: ['./loveitem.component.css'],
  providers:[LovesService]
})
export class LoveitemComponent implements OnInit {
  tel:any
  userid: any
  className:any='noxin'
  loveNum;any;
  @Input() _love: any
  @Output() dellove=new EventEmitter()
  @Output() zitanchu=new EventEmitter();
  if_love:boolean=false
  motai:boolean = true;

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private  loveSer:LovesService) {

  }

  ngOnInit() {
    let that=this
    //显示收藏数
    this.showlovenum(that);
    //判断登录
    if(sessionStorage.getItem('userId')) {
      that.tel=sessionStorage.getItem('userPhone')
      that.userid=sessionStorage.getItem('userId')
      that.showIfLove(that)
    }

  }

  godetail(id){
    this.router.navigate(['/shopping',id]);

  }

  //显示是否收藏
  showIfLove(that){
    if(this.userid) {
      that.loveSer.showalllove(that.userid + '', that._love.goodsid + '', function (result) {
        //22表示已收藏
        if (result.statusCode === 22) {
          that.if_love = true;
          that.className = "noxin";
        } else {
          that.if_love = false;
          that.className = "xin";
        }
      });
    }else{
      that.className = "noxin";
    }
  }

  //显示收藏数
  showlovenum(that){
    that.loveSer.showlovenum(that._love.goodsid + '', function (result) {
      if (result.statusCode == 26) {
        that.loveNum=0+'';
      } else {
        that.loveNum=result[0].love_num;
        // console.log(+"这是收藏的代号！！")
      }
    });
  }

  //改变收藏状态
  changeLove(){
    //如果用户已登录
    if(this.userid) {
      let that = this;
      //点击收藏
      if (that.if_love === false) {
        //console.log("这是未收藏显示");
        that.loveSer.insertloves(that.userid + '', that._love.goodsid + '', function (result) {
          //收藏成功
          // console.log(result.statusCode+"这是状态码");
          if (result.statusCode === 19) {
            that.showlovenum(that);
            that.className = " xin";
          }
        });
      }else if(that.if_love === true){
        //点击删除
        that.loveSer.deleteloves(that.userid + '', that._love.goodsid + '', function (result) {
          //取消收藏
          if (result.statusCode ==24) {
            that.showlovenum(that);
            that.className = "noxin";
          }
        })
      }
    }else{
      let that=this;
      //弹出模态框
      that.zitanchu.emit(this.motai);
    }
  }

  // pra(index){
  //   let that=this;
  //   that.n=index;
  //   if(that.n==index){
  //     that.n = that.n + 1;
  //     $('#' + index).css('background-position-x', '-3px').css('background-position-y', '-5px');
  //     //添加爱心
  //     that.loves[index].praise = that.loves[index].praise + 1;
  //     //请求数据库
  //     that.loveSer.addloves(that.loves[index].goodsid+'', function (result) {
  //     })
  //
  //   }
  // }






}

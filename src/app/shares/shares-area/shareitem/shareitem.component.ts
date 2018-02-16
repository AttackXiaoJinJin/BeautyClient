import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
declare var $: any
@Component({
  selector: 'app-shareitem',
  templateUrl: './shareitem.component.html',
  styleUrls: ['./shareitem.component.css'],
  providers: [UsersService],
})
export class ShareitemComponent implements OnInit {
  @Input() _comment: any
  //是否点赞
  like_if=false
  bigpic:any;
  //回复的内容
  _commentback:any
  //所有回复
  back:any;
  //userid
  userid:any
  constructor(
    private userSer: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private http:HttpClient
  ) { }
  //init==========
  ngOnInit() {
    let that=this
    if(sessionStorage.getItem('userId')){
      that.userid=sessionStorage.getItem('userId')
    }
    that.backshow()
  }
  //===========
  //点击打开评论
  tocomment()
  {
    //显示回复
    this._comment.state=true
  }
  //点赞==============
  dianzan(share_id){
    let that=this
    if(!that.like_if){
      that.userSer.dianzan({share_id}, function ( result) {
        if (result.statusCode==27) {
          that.like_if= true;
          that._comment.thum+=1
        }
      })
    }
  }
//  取消评论
  cancel()
  {
    this._comment.state=false
  }
  //显示大图片
  show_big(){
    this._comment.showbig=true;
    this.bigpic=this._comment.sharepic;
  }

//  发表回复
  backsend()
  {
    let that=this;
    console.log(that._commentback,'that._commentback')
    that.userSer.backComment(that._comment.shareid+'', that.userid+'',that._commentback+'',function ( result) {
        if(result.statusCode===31){
          that.backshow()
        }
    })
  }

  //显示回复
  backshow(){
    let that=this;
    // console.log(that._comment.shareid)
    that.userSer.backshow(that._comment.shareid+'', function ( result) {
      if(result!=='e005'){
        console.log(result,'result')
        that.back=result
      }
    })
  }

  //关闭大图片
  close_big(){
    this._comment.showbig=false;
  }

}

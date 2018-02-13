import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {stripComments} from "tslint/lib/utils";
declare var $: any;

@Component({
  selector: 'app-shares-area',
  templateUrl: './shares-area.component.html',
  styleUrls: ['./shares-area.component.css'],
  providers: [UsersService],
})
export class SharesAreaComponent implements OnInit {
  state:any;
  dstate:any
  //评论=============
  comments:any;
  back:any;
  index1:any;
  nologin:any;
  user_id=sessionStorage.getItem('userId');
  h:any;
  src='';
  bigpic:any;
  //显示大图片
  // showbig:boolean=false
  //是否点赞
  like_if=[]

  constructor(
    private userSer: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private http:HttpClient
  ) { }

  ngOnInit() {
    window.scrollTo(0,0);
    let that = this;
    //显示评论
    that.userSer.commentShow(function (result) {
      that.comments= result
      for(let i=0;i<result.length;i++){
        that.like_if[i]=false
      }
      // console.log(that.comments)
      // that.back=result[1]
    })
  }
  //========init
  sendshare(comment) {
    const body = {'com': comment .form.value.com, telephone: sessionStorage.getItem('userId'),
      'img':this.src};
    let that = this;
    if (sessionStorage.getItem('userId')){
      that.userSer.comment(body, function (result) {
        if ( result.StateCode==0){
          alert("发送失败");
        }else {
          // that.comments=result[0];
          that.comments.unshift(result[0][0]);
          $('#myform')[0].reset();
          that.state=true;
          $('#imgg').html('');
          setTimeout(function(){
            that.state=false;
          },1000)
        }
      })
    }
    else {
      that.nologin=true;
      setTimeout(function(){
        that.router.navigate(['/login']);
      },2000)
     }
  }
  //刷新===============
  refresh () {
    location.reload();
  }


  tocomment(index)
  {
    let comment=this.comments;
    //显示回复
    comment[index].state='true'
  }

    //点赞==============
  dianzan(share_id,thum,index){
    let that=this
    that.userSer.dianzan({share_id}, function ( result) {
      if (result.statusCode==27) {
        that.like_if[index] = true;
        that.comments[index].thum+=1
      }
    })
  }

  backsend(index, form)
  {
    const body = {'backcom': form.form.value.backcom,'shareid':this.comments [index].shareid,
      'telephone': sessionStorage.getItem('userId')};
    let that=this;
    that.comments[index].add = index+'s';
    this.userSer.backComment(body, function ( result) {
      if(result.StateCode!==0){
        $('#'+ index + 's').append(`<div class="col-sm-12 col-md-8" id="backshow">
              <span class="a">${result[0][0].backname}&nbsp;:</span>&nbsp;&nbsp;
              <span>${result[0][0].backtext}</span>&nbsp;&nbsp;
              <p class="b">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${result[0][0].backdate}</p>
              </div>`);
        that.comments[index].state=false;
      }else {
        alert('erro');
      }
    })
  }

  cancel(index)
  {
    this.comments[index].state=false
  }

  dels(index){
    let that = this;
    that.userSer.delmys({'shareid':that.comments[index].shareid},function (result) {
      if(result.StateCode == 1)
        $('.'+index).remove();
    })
  }

  onFileChanged(fileList: FileList) {
    this.preview(fileList[0]);
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      const h=1000*Math.random();
      this.h=h;
      formData.append('key','shares/'+this.user_id+h+'.jpg');
      formData.append('token', '2aOfl8mhZO6y1XkBaNtu-axhD3nO0EwZF6Og1kYh:qUQgKzUP77jPo_TgY6ZKKFUml00=:eyJzY29wZSI6InNoaW5lIiwiZGVhZGxpbmUiOjE1MTUxMTU5NjQyOTh9');
      let headers = new Headers({
        "Accept": "application/json"
      });
      // let options = new RequestOptions({ headers });
      this.http.post("http://up-z2.qiniu.com/", formData)
        .subscribe(
          data => console.log('success' + data),
          error => console.log(error)
        )
      this.src='shares/'+this.user_id+h+ '.jpg';
    }

  }

  preview(file) {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    const url = img.src;
    const $img =$(img);
    console.log($img);
    img.onload = function () {
      URL.revokeObjectURL(url);
      $('#imgg').append($img);
    }
  }

  //显示大图片
  show_big(index){
    this.comments[index].showbig=true;
    this.bigpic=this.comments[index].sharepic;
  }
  //关闭大图片
  close_big(index){
    this.comments[index].showbig=false;
  }
}

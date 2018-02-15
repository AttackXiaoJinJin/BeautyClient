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
  //点击评论的发送键
  if_click:any=false
  dstate:any
  //评论=============
  comments:any;
  //userid
  userid:any=null
  share_formdata:any
  //评论框里写的评论
  _comment:any
  //插入评论成功
  if_comment:any=false
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
    if(sessionStorage.getItem('userId')){
      that.userid=sessionStorage.getItem('userId')
    }
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
  //========initend
  //发送评论分享=============
  sendshare(comForm) {
    let that = this;
    if (sessionStorage.getItem('userId')){
      if(that._comment!==null){
        that.userSer.comment(that._comment+'', that.userid+'',function (result) {
          //评论成功
          if (result.statusCode===29) {
            //成功先把图片插入
            // 将formData传到数据库
            that.share_formdata.id=result.shareid
            that.userSer.upLoadShares(that.share_formdata, function (result) {
              if(result.statusCode===-1){
                //重置评论
                comForm.reset()
                $('#imgg').html('');
              }
            })
          }
        })
      }
    }
    else {
      that.nologin=true;
        that.router.navigate(['/login']);
     }
  }

  //刷新===============
  refresh () {
    location.reload();
  }

  //点击打开评论
  tocomment(index)
  {
    let comment=this.comments;
    //显示回复
    comment[index].state=true
  }

    //点赞==============
  dianzan(share_id,thum,index){
    let that=this
    if(!that.like_if[index]){
      that.userSer.dianzan({share_id}, function ( result) {
        if (result.statusCode==27) {
          that.like_if[index] = true;
          that.comments[index].thum+=1
        }
      })
    }
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
    let that=this
      //文件队列长度大于0,
      if (fileList.length > 0) {
        //选取队列的第一个文件
        let file: File = fileList[0];
        //创建一个formdata对象
        let formData: FormData = new FormData();
        //添加 name value filename
        formData.append('uploadFile', file, file.name);
        //添加name value null
        formData.append('id', this.userid);
        that.share_formdata=formData
      }
  }
  //预览图片
  preview(file) {
    const img = new Image();
    //创建图片路径
    img.src = URL.createObjectURL(file);
    const url = img.src;
    const $img =$(img);
    // console.log($img);
    img.onload = function () {
      URL.revokeObjectURL(url);
      $('#imgg').append($img);
      $img.css("object-fit","fill")
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

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
  saycomment:any
  //插入评论成功
  if_comment:any=false

  index1:any;
  nologin:any;
  user_id=sessionStorage.getItem('userId');
  h:any;
  src='';

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
    this.showcomment()
  }
  //========initend
  //显示评论
  showcomment(){
 let that=this
  that.userSer.commentShow(function (result) {
    that.comments= result
    console.log(result,56)
  })
}
  //发送评论分享=============
  sendshare(comForm) {
    let that = this;
    if (sessionStorage.getItem('userId')){
      if(that.saycomment!==null){
        that.userSer.comment(that.saycomment+'', that.userid+'',function (result) {
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
              //  显示评论
                that.showcomment()
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



}

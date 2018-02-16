import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-shares-myarea',
  templateUrl: './shares-myarea.component.html',
  styleUrls: ['./shares-myarea.component.css'],
  providers: [UsersService],
})
export class SharesMyareaComponent implements OnInit {
  state:any;
  comments=[];
  back:any;
  statem:any;bigpic:any;
  tel=sessionStorage.getItem('userId');
  h:any;src='';
  show_del:any;
  constructor(  private userSer: UsersService,
                private router: Router,
                private route: ActivatedRoute,
                private http:HttpClient) { }

  ngOnInit() {
    $(document).scrollTop(0);

    let that = this;
    that.userSer.commentShowmy({'tel':sessionStorage.getItem('userId')},function (result) {
      that.comments= result;
    })
    // that.userSer.backShowmysql({'tel':sessionStorage.getItem('userId')},function (result) {
    //   that.back= result;
    // })
  }
  show_big(index){
    this.comments[index].statem=true;
    this.bigpic=this.comments[index].sharepic;
  }
  close_big(index){
    this.comments[index].statem=false;
  }

  sendshare(comment) {
    const body = {'com': comment .form.value.com, telephone: sessionStorage.getItem('userId'),
    'img':this.src};
    let that = this;
    if (sessionStorage.getItem('userId')){
      // that.userSer.comment(body, function (result) {
      //   if ( result.StateCode==0){
      //     alert("发送失败");
      //   }else {
      //     that.comments.unshift(result[0][0]);
      //     $('#myform')[0].reset();
      //     that.state=true;
      //     $('#imgg').html('');
      //     setTimeout(function(){
      //       that.state=false;
      //     },1000)
      //   }
      // })
    }
    else {
      that.router.navigate(['/login']); }
  }

  refresh () {
    location.reload();
  }
  display(index)
  {let comment=this.comments;
    comment[index].state='true';}
  add(index,n){
    let comment=this.comments;
    let that=this;
    if(!comment[index].thum)
      comment[index].thum=0;
    comment[index].thum= comment[index].thum+1;
    // const body={'shareid':,'thum':comment[index].thum}
    that.userSer.dianzan( comment[index].shareid, function ( result) {
      if (result.StateCode == 0) {
        alert("失败");
      } else {}
    })
  }
  // backsend(index, form)
  // {
  //   const body = {'backcom': form.form.value.backcom,'shareid':this.comments [index].shareid,
  //     'telephone': sessionStorage.getItem('userId')}
  //   this.userSer.backComment(body, function ( result) {
  //
  //   })
  // }
  cancel(index)
  {
    this.comments[index].state=false;}
  hidd(){

  }
dels(index){
  let that = this;
  that.comments[index].show_del=true;
}
  onFileChanged(fileList: FileList) {
    this.preview(fileList[0]);
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      const h=1000*Math.random();
      this.h=h;
      formData.append('key','shares/'+this.tel+h+'.jpg');
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
      this.src='shares/'+this.tel+h+ '.jpg';
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
  commit(index){
  this.comments[index].show_del=false;
  let that=this;
    that.userSer.delmys({'shareid':that.comments[index].shareid},function (result) {
      if(result.StateCode == 1) {
        $('.'+index).remove();
      }
    })
}
  cancel1(index){
    this.comments[index].show_del=false;}
}

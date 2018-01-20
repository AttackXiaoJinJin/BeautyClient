import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ShareService} from "../services/share.service";
declare var $: any;
@Component({
  selector: 'app-shares',
  templateUrl: './shares.component.html',
  styleUrls: ['./shares.component.css'],
  providers: [ShareService],
})
export class SharesComponent implements OnInit {
  comments:any;
  //后台的分享数据
  share_result:any=null;
  //手机
  tel:any;
  h:any;
  src:any;
  show:any;
  if_login:any;


  // res:any;
  constructor(
    private shareSer: ShareService,
    private router: Router,
    private route: ActivatedRoute,
    private http:HttpClient
  ) { }

  ngOnInit() {
    //回到顶部
    window.scrollTo(0,0);
    let that = this
    //需要判断有无登录
    if(sessionStorage.getItem('userPhone')){
      that.tel=sessionStorage.getItem('userPhone')
    }

    //获取分享的物品=========
    that.shareSer.showshare(function (result) {
      console.log("aaa")
      if(result.statusCode===0){
        console.log("后台无数据！")
      }else{
        that.share_result= result
        console.log(result)
        console.log("aaaa")

      }
    })




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
        if(sessionStorage.getItem('userId')){
          $('.row').addClass('test3');
          $('[type="text"]').val('');
          $('.left_photo').html('');
          $('.shares_content').addClass('test4').addClass('shares_content1');
        }
       else{
          that.if_login=true;
          setTimeout(function(){
            that.router.navigate(['/login']);
          },2000)
        }
      });
      $('.submit').click(function () {
        $('.shares_content').removeClass('test4').removeClass('shares_content1');
        $('.row').removeClass('test3');
        $('[type="text"]').val('');
        $('.left_photo').html('');
      });


    })

  }

  // upload(forms) {let f=forms.form.value;
  //   const body={'tel':sessionStorage.getItem('userId'),'mytype':f.mytype,'name':f.name,'price':f.price,
  //     'feel':f.feeling,'src':this.src}
  //   const that = this;
  //   that.personSer.upload(body,function (result) {
  //     if (result.stateCode==0){
  //       alert('上传失败');
  //     }else {
  //
  //       that.put[0].type=f.mytype;
  //     that.put[0].img=result.img;that.put[0].imgname=f.name;
  //       that.put[0].price=f.price;that.put[0].feel=f.feeling;
  //     }
  //   })
  // }

    //  preview(file) {
    //   let img = new Image();
    //   img.src = URL.createObjectURL(file);
    //   const url = img.src;
    //   const $img =$(img);
    //   console.log($img);
    //   img.onload = function () {
    //     URL.revokeObjectURL(url);
    //     $('.left_photo').empty().append($img);
    //   }
    // }

  // onFileChanged(fileList: FileList) {
  //  this.preview(fileList[0]);
  //   if (fileList.length > 0) {
  //     let file: File = fileList[0];
  //     // this.preview(file);
  //     let formData: FormData = new FormData();
  //     formData.append('file', file, file.name);
  //     const h=1000*Math.random();
  //     this.h=h;
  //     formData.append('key','images/'+this.tel+h+ '.jpg');
  //     // sessionStorage.setItem('icon','images/'+this.tel+h+ '.jpg');
  //     formData.append('token', '2aOfl8mhZO6y1XkBaNtu-axhD3nO0EwZF6Og1kYh:qUQgKzUP77jPo_TgY6ZKKFUml00=:eyJzY29wZSI6InNoaW5lIiwiZGVhZGxpbmUiOjE1MTUxMTU5NjQyOTh9');
  //     let headers = new Headers({
  //       "Accept": "application/json"
  //     });
  //     // let options = new RequestOptions({ headers });
  //     this.http.post("http://up-z2.qiniu.com/", formData)
  //       .subscribe(
  //         data => console.log('success' + data),
  //         error => console.log(error)
  //       )
  //     this.src='images/'+this.tel+h+ '.jpg';
  //     this.upload(this.src);
  //   }
  //
  // }


// cancel2(){
//   $('.shares_content').removeClass('test4').removeClass('shares_content1');
//   $('.row').removeClass('test3');
//   $('[type="text"]').val('');
//   $('.left_photo').html('');
// }
  cancel(){
    this.show=false;
  }
  shares(){
    this.show=true;
  }

}


import { Component, OnInit,Input} from '@angular/core';
import {PersonalService} from './../../services/personal.service';
import {GlobalPropertyService} from './../../services/global-property.service'
import {HttpClient} from '@angular/common/http';

import {Router} from '@angular/router';
import {UsersService} from "../../services/users.service";
declare var $: any
@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css'],
  providers: [PersonalService,UsersService]
})
export class CenterComponent implements OnInit {
  // @Input() qq:any;
  _val:string='';
  mes: any ;
  //头像
  // src:any;
  icon:any;

  n:any;
  state:any;
  h:any;
  stateh:any;
  tu:any;
  //背景图片
  bkicon:any
  statem:any
  state1:any
  state2;
  //手机号
  _tel:any
  _id:any
  //用户名
  _name:any
  //邮箱
  _email:any
  _password:string;
  rgpsw1:string;
  // names=sessionStorage.getItem('username');
  pswconfirm1:string;

  constructor(private userSer: UsersService,
              private personSer: PersonalService,
              private router: Router,
              private  glo:GlobalPropertyService,
              private http:HttpClient
  ) {
  }
  shuzu=[['kt1.jpg','kt2.jpg','kt3.jpg','kt4.jpg','kt5.jpg'],['fj1.jpg','fj2.jpg','fj3.jpg','fj4.jpg','fj5.jpg'],
    ['xq1.jpg','xq2.jpg','xq3.jpg','xq4.jpg','xq5.jpg'],['mx2.jpg','mx1.jpg','mx5.jpg','mx3.jpg','mx4.jpg']];
  def:any;
  def1:string;
  fsq:any;


  ngOnInit() {
    let that=this
    that.n=1;
    that.def1=this.shuzu[1][4];
    that.def=this.shuzu[1];
    // that.showicon();
    that.statem=false;

    if (sessionStorage.getItem('userId')) {
      that._tel = sessionStorage.getItem('userPhone')
      that._id = sessionStorage.getItem('userId')
      that.icon= sessionStorage.getItem('icon');
      that.showuserinfo()
    } else {
      //  弹出模态框

    }


  }
  ngAfterContentInit(){
    const that = this;
    const those = that;
    $('.change').click(function () {
      $('.wallpaper').animate({
        opacity:'1',
        height:'hide',
      },1000,'linear');

      $('.wallpaper').animate({
        height:'toggle',
      },2000,'linear');
    });
  }
  ngOnDestroy(){
    console.log('personal -ngDestroy');
    // this.glo.hiddenNavs=false;
  }
  //获取用户信息
  showuserinfo(){
    let that=this
    //购物车
    that.userSer.showuserinfo(that._id+'', function (result) {
        that.bkicon= result.bkicon
        that._email= result.email
        that.icon=result.icon
      // console.log(that.bkicon,'103')
    })
  }


  toIndex(){
    this.router.navigate(['/index',this._val]);
    // this.glo.serverUrl='http://127.0.0.1:8000'
  }


  top(){

    this.def=this.shuzu[0];

  }
  bottom(){
    if(this.def==this.shuzu[0]){
      this.def=this.shuzu[1]
    }
    else if(this.def==this.shuzu[1]){
      this.def=this.shuzu[2]
    }
    else{
      this.def=this.shuzu[3];
    }
  }

    //上传头像=======================
    onFileChanged(fileList: FileList) {
      //文件队列长度大于0,
      if (fileList.length > 0) {
        //选取队列的第一个文件
        let file: File = fileList[0];
        //创建一个formdata对象
        let formData: FormData = new FormData();
        //添加 name value filename
        formData.append('uploadFile', file, file.name);
        //添加name value null
        formData.append('id', this._id);
        // console.log(formData.get('uploadFile'));
        // console.log(formData.get('user_id'));
        // console.log(formData,'234');
        //上传文件
        // let str = '{"id":' + this._id + '}';
        // let user_id = JSON.parse(str);
        let that=this;
        // 将formData传到数据库
        this.userSer.upLoad(formData, function (result) {
          console.log(result,'240')
          if(result.statusCode==-1){
            that.showuserinfo()

          }
        });
      }
  }
  //上传头像================================end



//   upload(src){
//     let that=this;
//   that.personSer.upload({'tel':sessionStorage.getItem('userId'),'src':src},function (result) {
//         if (result.stateCode==0){
//           that.stateh=4;
//           setTimeout(function(){
//             that.stateh = 10;
//           },2000 );
//         }else {
//           // that.back[0].icon = result[0][0].icon;
//           that.icon = result[0][0].icon;
//           that.mes = result;
//           that.stateh =0;
//           setTimeout(function(){
//             that.stateh = 10;
//           },2000 );
//
//         }
//       })
// }

  change(){
    const that = this;
    let lu=that.tu;
    that.personSer.change({'tu':lu,'tel':sessionStorage.getItem('userId')},function (result) {
      that.stateh=1;
      setTimeout(function(){
        that.stateh=10;
      }, 3000 );
    })
  }
  editinfo(){
    this.state=true;
  }
  textname(){
    this.state1=true;
  }
  textput(){
    this.state2=true;
  }
  updaten(myForm){
    this.state1=false;
    this.state=false;
    if(myForm.form.value.username){
      // this.back[0].username=myForm.form.value.username;
      this._name=myForm.form.value.username;
    }
    sessionStorage.setItem('username',myForm.form.value.username);
    let that=this;
    that.personSer.name({'names':myForm.form.value.username,'tel':sessionStorage.getItem('userId')},function (result) {

    })
  }
  updaten1(myForm){
    this.state2=false;
    this.state=false;
    if(myForm.form.value.useremail){
      // this.back[0].email=myForm.form.value.useremail;
      this._email=myForm.form.value.useremail
    let that=this;
    that.personSer.changee({'email':myForm.form.value.useremail,'tel':sessionStorage.getItem('userId')},function (result) {
    })
    }
  }
}


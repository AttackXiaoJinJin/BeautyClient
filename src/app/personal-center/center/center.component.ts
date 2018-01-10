import { Component, OnInit,Input} from '@angular/core';
import {PersonalService} from './../../services/personal.service';
import {GlobalPropertyService} from './../../services/global-property.service'
import {HttpClient} from '@angular/common/http';

import {Router} from '@angular/router';
declare var $: any
@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css'],
  providers: [PersonalService]
})
export class CenterComponent implements OnInit {
  // @Input() qq:any;
  _val:string='';
  mes: any ;src:any;
  n:any;state:any;h:any;stateh:any;
  tu:any;back:any;statem:any;
  state1:any;state2;tel=sessionStorage.getItem('userId');
  _password:string;rgpsw1:string;
  // names=sessionStorage.getItem('username');
  pswconfirm1:string;

  constructor(private personSer: PersonalService,
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
  dianji(index){
    let def='personal_images/'+this.def[index];
    this.back[0].background=def;
    this.fsq=true;
    this.tu =def;
  }

  showm(){
    this.statem=true;
    this._password='';
    this.rgpsw1='';
    this. pswconfirm1='';
  }
  hid(){
    this.statem=false;
  }

  toregist (reg) {
    this.statem=false;
    let that=this;
    that.personSer.updatep ({'pass':reg.form.value.pass,'newpass':reg.form.value.newpass,
      'tel':sessionStorage.getItem('userId')},function (result) {
      if(result.StateCode==0){
        that.stateh= 3;
        setTimeout(function(){
          that.stateh = 10;
        }, 3000 );
     that._password='';
     that.rgpsw1='';
     that. pswconfirm1='';
      }
      else{
        that.stateh= 2;
        setTimeout(function(){
          that.stateh =10;
        }, 3000 );
      }
    })
  }
  ngOnInit() {
    this.n=1;
    this.def1=this.shuzu[1][4];
    this.def=this.shuzu[1];
    this.showicon();
    this.statem=false;
this.src= sessionStorage.getItem('icon');
  }

  toIndex(){
    this.router.navigate(['/index',this._val]);
    this.glo.serverUrl='http://127.0.0.1:8000'
  }
  ngOnDestroy(){
    console.log('personal -ngDestroy');
    // this.glo.hiddenNavs=false;
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

 preview(file) {
  const img = new Image();
  img.src = URL.createObjectURL(file);
  const url = img.src;
  const $img =$(img);
  console.log($img);
  img.onload = function () {
    URL.revokeObjectURL(url);
    $('#preview').empty().append($img);
    // $('#preview1').empty().append($img);
  }
}
  showicon(){
  let that=this;
  const body ={ "telephone": sessionStorage.getItem('userId')};
  this.personSer.getUserIcon (body, function (result) {
    that.back=result;
    if(result[0].background==null)
    {that.back[0].background='personal_images/fj2.jpg';}
    sessionStorage.setItem('icon',result[0].icon);
  })
}

    onFileChanged(fileList: FileList) {
      this.preview(fileList[0]);
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      const h=100*Math.random();
      this.h=h;
      formData.append('key','icons/'+this.tel+h+ '.jpg');
      sessionStorage.setItem('icon','icons/'+this.tel+h+ '.jpg');
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
      this.src=sessionStorage.getItem('icon');
      this.upload(this.src);
    }
  }
upload(src){let that=this;
  that.personSer.upload({'tel':sessionStorage.getItem('userId'),'src':src},function (result) {
        if (result.stateCode==0){
          that.stateh=4;
          setTimeout(function(){
            that.stateh = 10;
          },2000 );
        }else {
          that.back[0].icon = result[0][0].icon;
          that.mes = result;
          that.stateh =0;
          setTimeout(function(){
            that.stateh = 10;
          },2000 );

        }
      })
}

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
  showb(){
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
      this.back[0].username=myForm.form.value.username;
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
      this.back[0].email=myForm.form.value.useremail;
    let that=this;
    that.personSer.changee({'email':myForm.form.value.useremail,'tel':sessionStorage.getItem('userId')},function (result) {
    })
    }
  }
}


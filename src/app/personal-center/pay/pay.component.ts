import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PersonalService} from '../../services/personal.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UsersService} from "../../services/users.service";
declare var $: any ;
@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css'],
  providers: [UsersService],
})
export class PayComponent implements OnInit {
  address:any;sum=0;
  address_succ:any;
  state1:any;a:any;
  b:any;c:any;
  x1=2;state_pay:any;
  x=true;
  homeid='';goods:any;_id:string;
  every:any;
  _shen:any;
  _city:any;_qu:any;
  value:any;_detail:any;_name:any;
  _tel:any;
  shuzu={
    '江苏':{'苏州':['姑苏区','常熟市'], '南京':['南京区','南京市'],},
    '江西':{'萍乡':['萍乡区','萍乡市'], '宜春':['宜春区','宜春市']}
  };
  constructor(
    private userSer: UsersService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.a=Object.keys(this.shuzu);
    let that=this;
    that.userSer.showaddress({'tel':sessionStorage.getItem('userId')},function (result) {
      if ( result.StateCode==0) {
      }else {
        that.address=result[0];
        that.goods=result[1];
        for(let i=0;i<that.goods.length;i++)
        {that.sum=that.sum+(that.goods[i].ordnumber)*(that.goods[i].goodsprice)
        }
      }
    });
  }
  addhome(addForm){
    var form=addForm.form.value;
    var address=form.shen+form.city+form.qu;
    const body={'address':address,'you':form.you,'detail':form.detail,'name':
      form.name,'tel':form.tel,'usertel':sessionStorage.getItem('userId')}
    let that = this;
    that.perSer.addhome(body,function (result) {
      if ( result.StateCode==0) {
      }else {
        that.state1=false;
        that.address.unshift(result[0][0]);
      }
    })
  }
  choose(index){
    for(let i=0;i<this.address.length;i++)
    {this.address[i].state= false;}
    this.address[index].state=true;
    this.homeid = this.address[index].addid;
  }
  delhome(index){let that=this;
  that.address[index].del=index+'w';
    that.perSer.delhome({'addid':that.address[index].addid},function (result) {
      if ( result.StateCode==0) {
      }else {
       $('#'+index+'w').parent().parent().remove();
      }
    })
  }
  editor(index,addForm){
   this.every=this.address[index];
   this.state1=true;
   this._id=this.address[index].addid;
    const a=this.address[index];
    this.x1= 2 ;
    const add=a.address;const add1=a.address;
    this._shen=a.address.substring(0,2);
    this.sh();
   this._city=add.substring(2,4);
    this.sh1();
    this._qu=add1.substring(4,7);
 this.value= this.every.postem;
 this._name= this.every.shopname;
 this._tel= this.every.shoptel;
 this._detail= this.every.detailadd;
  }
  update(addForm){let that=this;
    // alert(addForm.form.value.homeid);
    that.perSer.updatehome(addForm.form.value,function (result) {
      if ( result.StateCode==0) {
      }else {const f=addForm.form.value;
        that.every.shopname=f.name;
        that.every.address=f.shen+f.city+f.qu;
        that.every.detailadd=f.detail;
        that.every.shoptel=f.tel;
        that.state1=false;
        that.address_succ=1;
        setTimeout(function(){
          that.address_succ=false;
        }, 3000 );
      }
    })
  }
  usenew(){
    this.state1=true;
    this.x1=1;
    $('#myform')[0].reset();
  }
  cancel() {
    this.state_pay=0;
    this.state1=false;
    $('#myform')[0].reset();
  }
pay(){let that=this;
if(that.homeid=='')
{  that.address_succ=2;
  setTimeout(function(){
    that.address_succ=false;
  }, 3000 );}
else{
  that.state_pay=1;$('.slideCircle1').css('background-color','red');
  $('#slideLine_id3').css('background-color','red');
  if($('.circle').html()>0){
    $('.circle').html($('.circle').html()-1);}
}

  };

pays(){let that=this;
  that.perSer.chhome({'homeid':that.homeid,'tel':sessionStorage.getItem('userId')},function (result) {
    that.router.navigate(['personal-center/myflow']);
    that.del1();
    that.state_pay=0;
  })
}
  sh(){
    this.b=Object.keys(this.shuzu[this._shen]);
  }
  sh1(){
    this.c=this.shuzu[this._shen][this._city];
    this._qu =this.c[0];
  }
 back(){
  let that=this;
  that.sum=0;
  that.perSer.del({'tel':sessionStorage.getItem('userId')},function (result) {
  });
  that.router.navigate(['personal-center/shapping-car']);
}
del1(){
    let that=this;
    that.sum=0;
    that.perSer.del({'tel':sessionStorage.getItem('userId')},function (result) {
    });
  $('.center_goods').remove();
}
  ded(id,index){
      let that = this;
      that.perSer.deldan({'tel': sessionStorage.getItem('userId'),'id':id}, function (result) {
        if (result.StateCode == 0) {
        } else {
          $('.'+index).remove();
          that.sum= that.sum-(that.goods[index].goodsprice)*(that.goods[index].ordnumber);
        }
      });
  }

}

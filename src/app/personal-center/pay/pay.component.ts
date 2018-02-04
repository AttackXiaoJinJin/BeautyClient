import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PersonalService} from '../../services/personal.service';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from "../../services/users.service";
import {ShappingCarComponent} from "../shopping-car/shopping-car.component";
declare var $: any ;
@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css'],
  providers: [UsersService],
})
export class PayComponent implements OnInit {
  //用户id
  _id: string
  //用户电话
  _tel: any
  //收货姓名
  _name: any
  //收货地址
  address: any
  //所有地址结果
  addressresult: any
  //删除地址是否成功
  // if_del:any=false
  //是否被选中,代替删除
  if_choose=0
  //地址的index
  addressArray=[]
  //地址长度
  address_length=0
  //是否新增地址
  if_addaddress:boolean=false
  //选中的省市区数组
  pro: any
  cit: any
  dis: any
  //编辑地址================
  //选择的省
  _province: any
  //选择的市
  _city: any
  //选择的区
  _district: any
  //详细地址
  _detail: any
  //集合的地址
  _alladdress:any
  //邮政
  _mail: any;
  //购物车商品
  goods: any;
  //总价
  sum = 0;
  //选中的地址的信息
  choose_name:any
  choose_mail:any
  choose_address:any
  choose_tel:any
  //创建订单号
  order_numbering:any
  //在编辑订单的时候存储衣服的数量的数组，这样方便插入
  // clothesArray=[]
  clothesArray:any
  //选择地址的id
  address_id: any;
  state1: any;

  x1 = 2;
  state_pay: any=1;
  x = true;
  homeid = '';


  every: any;






  //省市区数组================
  shuzu = {
    '江苏':
      { '苏州':
          ['吴中', '常熟','相城'],
        '南京':
          ['玄武', '鼓楼','江宁']
      },
    '上海':
      { '上海':
          ['浦东新区', '杨浦']
      }
  };

  constructor(
    private route:ActivatedRoute,
    private userSer: UsersService,
    private router: Router,
    // private shopping: ShappingCarComponent
              ) {
  }






  ngOnInit() {

    //选择省
    this.pro = Object.keys(this.shuzu);
    let that = this;
    that.clothesArray = that.route.snapshot.paramMap.get('sum')
    console.log(that.route.snapshot.paramMap,'')
    // that.clothesArray=that.clothesArray.split("-")
    if (sessionStorage.getItem('userId')) {
      that._tel = sessionStorage.getItem('userPhone')
      that._id = sessionStorage.getItem('userId')
      that.showaddress()
      that.myshop()
    } else {
      //  弹出模态框
      that.router.navigate(['/login']);
    }

  }

  //=================init

  showaddress() {

    let that = this
    that.userSer.showaddress(that._id + '', function (result) {
        if (result.statusCode == 0) {
          //  新建地址
        } else {
          // that.address = result[0];
          // that.goods = result[1];
          // for (let i = 0; i < that.goods.length; i++) {
          //   that.sum = that.sum + (that.goods[i].ordnumber) * (that.goods[i].goodsprice)
          // }
          that.addressresult = result
          // console.log(that.addressresult)
          that.address_length=result.length
          for(let i=0;i<result.length;i++){
            that.addressArray.push(i)
          }

        }
      }
    );
  }

  //我的购物车
  //  我的购物车
  myshop(){
    let that=this
    //购物车
    that.userSer.myshop(that._tel+'', function (result) {
      if ( result.statusCode!==0){
        that.goods = result
        for(let i=0,m=result.length;i<m;i++){
          that.sum+=result[i].shopnum*result[i].goodsprice
        }
      }
      // that.mes.unshift(that.detail);
      // that.mesf=result[1];
    })
  }



  addaddress(){
    let that = this
    that._alladdress=that._province+that._city+that._district+that._detail
    // console.log(that._alladdress+'',that._name+'',that._tel+'',that._id+'',that._mail+'')
    that.userSer.addaddress(that._alladdress+'',that._name+'',that._tel+'',that._id+'',that._mail+'',function (result) {
      if ( result.statusCode===0) {
        this.router.navigate(['/**'])
      }else {
        if(result.statusCode===15){
          //success
          // that.state1=false
          // that.address.unshift(result[0][0])
          that.showaddress()
          that.if_addaddress=false
        //  清空表单
          that.pro = Object.keys(that.shuzu)
          that._detail=''
          that._name=''
          that._tel=''
          that._mail=''
        }else if(result.statusCode===16){
          //false
          console.log("添加地址失败")
        }

      }
    })
  }

  //选择收货地址
  chooseaddress(index,item){
    this.if_choose=index
    this.choose_name=item.username
    this.choose_mail=item.mail
    this.choose_address=item.address
    this.choose_tel=item.usertel
    this.address_id=item.addressid
  //   for(let i=0;i<this.address.length;i++)
  //   {this.address[i].state= false;}
  //   this.address[index].state=true;
  //   this.homeid = this.address[index].addid;
  }
  //删除地址=======================
  deladdress(index,addressid){
    // console.log(addressid)
    let that=this
    // that.address[index].del=index+'w'
    that.userSer.deladdress(addressid+'',function (result) {
      if ( result.statusCode==13) {
        //将删除的地址index替换成a
        that.addressArray.splice(that.addressArray.indexOf(index), 1,'a')
        for(let i=0;i<that.address_length;i++){
          if(that.addressArray[i]!=='a'){
            that.if_choose=that.addressArray[i]
            break
          }else{
            //  提示没有地址了,add address

          }
        }
        alert("删除地址成功！")
      }else if ( result.statusCode==14){
        alert("删除地址失败！")
       // $('#'+index+'w').parent().parent().remove();
      }
    })
  }



//   editor(index,addForm){
//    this.every=this.address[index];
//    this.state1=true;
//    this._id=this.address[index].addid;
//     const a=this.address[index];
//     this.x1= 2 ;
//     const add=a.address;const add1=a.address;
//     this._shen=a.address.substring(0,2);
//     this.sh();
//    this._city=add.substring(2,4);
//     this.sh1();
//     this._qu=add1.substring(4,7);
//  this.value= this.every.postem;
//  this._name= this.every.shopname;
//  this._tel= this.every.shoptel;
//  this._detail= this.every.detailadd;
//   }
//   update(addForm){let that=this;
//     // alert(addForm.form.value.homeid);
//     that.perSer.updatehome(addForm.form.value,function (result) {
//       if ( result.StateCode==0) {
//       }else {const f=addForm.form.value;
//         that.every.shopname=f.name;
//         that.every.address=f.shen+f.city+f.qu;
//         that.every.detailadd=f.detail;
//         that.every.shoptel=f.tel;
//         that.state1=false;
//         that.address_succ=1;
//         setTimeout(function(){
//           that.address_succ=false;
//         }, 3000 );
//       }
//     })
//   }

  //使用新地址
  usenew(){
//     this.state1=true;
//     this.x1=1;
//     $('#myform')[0].reset();
    this.if_addaddress=true
  }
  cancel() {
    let that=this
    that.if_addaddress=false
    //  清空表单
    that.pro = Object.keys(that.shuzu)
    that._detail=''
    that._name=''
    that._tel=''
    that._mail=''
    // this.state_pay=0;
    // this.state1=false;
    // $('#myform')[0].reset();
  }
pay(){
    let that=this
    this.createOrderNum()
  // console.log(that.address_id,'294')
  // console.log(that.goods,'295');

  // for(let i=0,m=that.goods.length;i<m;i++){
  //   that.userSer.addorder(that._id+'',that.address_id+'',that.goods[i].goodsid+'',that.clothesArray[i]+'',that._mail+'',function (result) {
  //     if ( result.statusCode===0) {
  //       this.router.navigate(['/**'])
  //     }else {
  //       if(result.statusCode===15){
  //         //success
  //         // that.state1=false
  //         // that.address.unshift(result[0][0])
  //         that.showaddress()
  //         that.if_addaddress=false
  //         //  清空表单
  //         that.pro = Object.keys(that.shuzu)
  //         that._detail=''
  //         that._name=''
  //         that._tel=''
  //         that._mail=''
  //       }else if(result.statusCode===16){
  //         //false
  //         console.log("添加地址失败")
  //       }
  //     }
  //   })
  // }





  //   if(that.homeid=='')
  // {
  //   that.address_succ=2;
  //   setTimeout(function(){
  //     that.address_succ=false
  //   }, 3000 )
  // }
  // else{
  //   that.state_pay=1;$('.slideCircle1').css('background-color','red')
  //   $('#slideLine_id3').css('background-color','red')
  //   if($('.circle').html()>0){
  //     $('.circle').html($('.circle').html()-1)
  //   }
  // }
  }


//
// pays(){let that=this;
//   that.perSer.chhome({'homeid':that.homeid,'tel':sessionStorage.getItem('userId')},function (result) {
//     that.router.navigate(['personal-center/myflow']);
//     that.del1();
//     that.state_pay=0;
//   })
// }

//  选好省后要弹出选择的市
  choosecity(){
    this.cit=Object.keys(this.shuzu[this._province])
    console.log(this.cit)
  }
  //选择好市后要弹出区
  choosedistrict(){
    this.dis=this.shuzu[this._province][this._city]
    console.log(this._city)
    console.log(this.dis)
  }



 back(){
  let that=this;
//   that.sum=0;
//   that.perSer.del({'tel':sessionStorage.getItem('userId')},function (result) {
//   });
  that.router.navigate(['personal-center/shopping-car']);
}

  //创建唯一的订单号
  createOrderNum(){
    let nowtime = new Date();
    this.order_numbering+=nowtime.getFullYear();
    if(nowtime.getMonth()<9){
      this.order_numbering = this.order_numbering+"0"+(nowtime.getMonth()+1);
    }else{
      this.order_numbering = this.order_numbering+(nowtime.getMonth()+1);
    }
    if(nowtime.getDate()<10){
      this.order_numbering = this.order_numbering+"0"+nowtime.getDate();
    }else{
      this.order_numbering = this.order_numbering+nowtime.getDate();
    }
    if(nowtime.getHours()<10){
      this.order_numbering = this.order_numbering+"0"+nowtime.getHours();
    }else{
      this.order_numbering = this.order_numbering+nowtime.getHours();
    }
    if(nowtime.getMinutes()<10){
      this.order_numbering = this.order_numbering+"0"+nowtime.getMinutes();
    }else{
      this.order_numbering = this.order_numbering+nowtime.getMinutes();
    }
    if(nowtime.getSeconds()<10){
      this.order_numbering = this.order_numbering+"0"+nowtime.getSeconds();
    }else{
      this.order_numbering = this.order_numbering+nowtime.getSeconds();
    }
    this.order_numbering = this.order_numbering+this._id+this.choose_tel+this.choose_mail;
  }


// del1(){
//     let that=this;
//     that.sum=0;
//     that.perSer.del({'tel':sessionStorage.getItem('userId')},function (result) {
//     });
//   $('.center_goods').remove();
// }



//   ded(id,index){
//       let that = this;
//       that.perSer.deldan({'tel': sessionStorage.getItem('userId'),'id':id}, function (result) {
//         if (result.StateCode == 0) {
//         } else {
//           $('.'+index).remove();
//           that.sum= that.sum-(that.goods[index].goodsprice)*(that.goods[index].ordnumber);
//         }
//       });
//   }

}

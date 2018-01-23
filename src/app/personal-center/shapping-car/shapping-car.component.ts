import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from "../../services/users.service";
declare var $: any ;
@Component({
  selector: 'app-shapping-car',
  templateUrl: './shapping-car.component.html',
  styleUrls: ['./shapping-car.component.css'],
  providers: [UsersService],
})
export class ShappingCarComponent implements OnInit {
  if_login:boolean=false
  tel:any
  id:any
  shopresult:any
  goodsid:any
 // 定时器
  timer:any=null
 // 是否删除物品
  if_del:boolean=false
 // 物品的总数
  allnum:any
 // 所有商品总价
  allprice:any=0

 // ============
 mes:any;
sum=0;
//提示
none:any;
statef:any;
  constructor(
    private userSer: UsersService,
    private router: Router,
  ) { }
  ngOnInit() {
    let that = this;
    if(sessionStorage.getItem('userId')) {
      that.tel=sessionStorage.getItem('userPhone')
      that.id=sessionStorage.getItem('userId')
      that.myshop()
    }else{
    //  弹出模态框

    }
  }

  // showshop(){
  //   let that=this
  //   that.userSer.showshop(that.tel+'', function (result) {
  //     if ( result.StateCode===0){
  //       that.none='空空如也~~~~'
  //     } else {
  //       that.mes= result;
  //       for(let i=0;i<that.mes.length;i++){
  //         that.mes[i].total= (that.mes[i].goodsprice) * (that.mes[i].shopsum);
  //       }
  //
  //     }
  //   })
  // }
//  我的购物车
  myshop(){
    let that=this
    //购物车
    that.userSer.myshop(that.tel+'', function (result) {
      if ( result.statusCode===0){
        that.none='空空如也~~~~'
      } else {
        that.shopresult = result
      }
      // that.mes.unshift(that.detail);
      // that.mesf=result[1];
    })
  }





  cutnum(index){
    let that=this
    // let mes=this.mes;
    // if(  mes[index].shopsum>0) {
    if(that.shopresult&&that.shopresult[index].shopnum>0) {
      that.shopresult[index].shopnum -= 1;
      // mes[index].total = (mes[index].goodsprice) * (mes[index].shopsum);
      if ($('#' + index).is(':checked')) {
        // this.sum = this.sum - mes[index].goodsprice;
        that.allprice -= that.shopresult[index].shopnum*that.shopresult[index].goodsprice
      }
    }
  }
  addnum(index) {
    let mes = this.mes;
    mes[index].shopsum = mes[index].shopsum + 1;
    mes[index].total = (mes[index].goodsprice) * (mes[index].shopsum);
    if ($('#' + index).is(':checked') && this.sum >= 0) {
      this.sum = this.sum + mes[index].goodsprice;
    }
  }

  del(shopid){
    let that=this
    clearInterval(that.timer)
     // mes[index].del = index+'s';
    that.userSer.delshop(shopid+'', function (result) {
      if ( result.statusCode===8){
        // $('#'+index+'s').parent().parent().parent().remove();
        //删除物品

        if($('.circle').html()>0){
        $('.circle').html($('.circle').html()-1)
        }

        that.statef=true
        that.timer=setInterval(function(){
          that.statef=false
        },2000)

      }
    })
  }

  selectCheck(shopid){
    // let mes = this.mes;
    // if($('#'+ index).is(':checked'))
    // {this.sum= this.sum+mes[index].total;
    // $('#pay_id').removeAttr("disabled");
    //  this.addorder(index);
    // }
    // else{
    //   this.sum=this.sum-mes[index].total;
    //   this.delorder(index);
    // }
  }
    allchecked(mes){
      // if($(".quan").is(':checked'))
      // { for(let i=0;i<mes.length;i++)
      //   this.sum=this.sum+mes[i].total;
      //   $("input[type='checkbox']").attr("checked", true);}
      // else {
      //   $("input[type='checkbox']").removeAttr("checked");
      //   this.sum=0;
      // }
    }

    //返回到个人中心首页ok
    back(){
      this.router.navigate(['/personal-center']);
    }

    //去支付页面
    gopay (){
      let that=this
      that.router.navigate(['/personal-center/pay',that.allnum]);
    }
   // 添加订单
   addorder(index){
     // let that = this;
     // const body={'id':that.mes[index].goodsid,'shopsum':that.mes[index].shopsum,'tel':sessionStorage.getItem('userId'),
     // 'size':that.mes[index].goodssize }
     // that.userSer.addorder(body, function (result) {
     // })
   }

  delorder(index){
    // let that = this;
    // that.userSer.delorder({'id':that.mes[index].goodsid}, function (result) {
    // })
  }

  //查看物品详情
  godetail(id){
    this.router.navigate(['/shopping',id]);
  }


}

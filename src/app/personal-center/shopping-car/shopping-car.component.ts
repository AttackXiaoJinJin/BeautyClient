import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from "../../services/users.service";
declare var $: any ;
@Component({
  selector: 'app-shapping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.css'],
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
 // 商品是否成功删除
  real_del:boolean=false
 // 物品的总数
  allnum:any
 // 所有商品总价
  allprice:any=0
  //在编辑订单的时候存储衣服的数量的数组，这样方便插入
  clothesArray:any

 // ============
 mes:any;
sum=0;
//提示
none:any;
statef:any;
  constructor(
    private route:ActivatedRoute,
    private userSer: UsersService,
    private router: Router,
  ) { }
  ngOnInit() {
    let that = this
    that.clothesArray=[]
    if(sessionStorage.getItem('userId')) {
      that.tel=sessionStorage.getItem('userPhone')
      that.id=sessionStorage.getItem('userId')
      that.myshop()
    }else{
    //  弹出模态框

    }
  }
  //=========================
  ngOnDestroy(){

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
        for(let i=0,m=result.length;i<m;i++){
          that.allprice+=result[i].shopnum*result[i].goodsprice
          that.clothesArray.push(result[i].shopnum)
        }
      }
      // that.mes.unshift(that.detail);
      // that.mesf=result[1];
    })
  }





  cutnum(index){
    let that=this
    // let mes=this.mes;
    // if(  mes[index].shopsum>0) {
    if(that.shopresult&&that.shopresult[index].shopnum>1) {
      that.shopresult[index].shopnum -= 1
      that.clothesArray[index]=that.shopresult[index].shopnum
      // mes[index].total = (mes[index].goodsprice) * (mes[index].shopsum);
      // if ($('#' + index).is(':checked')) {
        // this.sum = this.sum - mes[index].goodsprice;
        that.allprice -= that.shopresult[index].goodsprice
      // }
    }
  }
  addnum(index) {
    let that=this
    // mes[index].shopsum = mes[index].shopsum + 1;
    // mes[index].total = (mes[index].goodsprice) * (mes[index].shopsum);
    // if ($('#' + index).is(':checked') && this.sum >= 0) {
    //   this.sum = this.sum + mes[index].goodsprice;
    // }
    if(that.shopresult&&that.shopresult[index].shopnum<10) {
      that.shopresult[index].shopnum += 1
      that.clothesArray[index]=that.shopresult[index].shopnum
      // mes[index].total = (mes[index].goodsprice) * (mes[index].shopsum);
      // if ($('#' + index).is(':checked')) {
      // this.sum = this.sum - mes[index].goodsprice;
      that.allprice += that.shopresult[index].goodsprice
      // }
    }

  }
  //删除商品
  del(shopid,index,price,num){
    let that=this
    window.confirm('你确定要删除该商品吗？')? that.if_del=true: that.if_del=false
    // clearInterval(that.timer)
     // mes[index].del = index+'s';
    if(that.if_del){
      that.userSer.delshop(shopid+'', function (result) {
        if ( result.statusCode===8){
          alert("删除成功!")
          that.real_del=index
          that.allprice -= price*num
          // $('#'+index+'s').parent().parent().parent().remove();
          //删除物品

          // if($('.circle').html()>0){
          // $('.circle').html($('.circle').html()-1)
          // }

          // that.statef=true
          // that.timer=setInterval(function(){
          //   that.statef=false
          // },2000)

        }else{
          alert("删除失败!")
          that.real_del=false
        }
      })
    }

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
      that.clothesArray=that.clothesArray.join("-")
      that.router.navigate(['/personal-center/pay',that.clothesArray])
      console.log(that.clothesArray,'shop')
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


